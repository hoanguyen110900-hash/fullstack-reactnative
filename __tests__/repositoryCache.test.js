import createApolloClient from "../src/utils/apolloClient";
import { GET_REPOSITORIES } from "../src/graphql/queries";

const defaults = {
  orderBy: "CREATED_AT",
  orderDirection: "DESC",
  searchKeyword: "",
  first: 5,
};

const connection = (id) => ({
  edges: [{
    cursor: id,
    node: {
      __typename: "Repository",
      id,
      fullName: id,
      description: "",
      language: "JavaScript",
      forksCount: 0,
      stargazersCount: 0,
      ratingAverage: 0,
      reviewCount: 0,
      ownerAvatarUrl: "",
    },
  }],
  pageInfo: { endCursor: id, hasNextPage: true },
});

describe("repository cache", () => {
  let cache;

  beforeEach(() => {
    cache = createApolloClient({ getAccessToken: async () => null }).cache;
    cache.restore({});
  });

  const write = (cache, variables, id) => cache.writeQuery({
    query: GET_REPOSITORIES,
    variables,
    data: { repositories: connection(id) },
  });

  const readIds = (cache, variables) => cache.readQuery({
    query: GET_REPOSITORIES,
    variables,
  })?.repositories.edges.map(({ node }) => node.id);

  it.each([
    { searchKeyword: "react" },
    { orderBy: "RATING_AVERAGE" },
    { orderDirection: "ASC" },
  ])("keeps results separate for %o", (change) => {
    write(cache, defaults, "original");
    const changed = { ...defaults, ...change };

    expect(readIds(cache, changed)).toBeUndefined();
    write(cache, changed, "changed");

    expect(readIds(cache, defaults)).toEqual(["original"]);
    expect(readIds(cache, changed)).toEqual(["changed"]);
  });

  it("merges subsequent pages only into the matching search and sort", () => {
    const searched = { ...defaults, searchKeyword: "react" };
    write(cache, defaults, "original");
    write(cache, searched, "first");
    write(cache, { ...searched, after: "first" }, "second");

    expect(readIds(cache, searched)).toEqual(["first", "second"]);
    expect(readIds(cache, defaults)).toEqual(["original"]);
  });
});
