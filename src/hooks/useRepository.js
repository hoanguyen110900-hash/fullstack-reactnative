import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id) => {
  const queryVariables = {
    id,
    first: 5,
  };

  const {
    data,
    loading,
    error,
    fetchMore: apolloFetchMore,
  } = useQuery(GET_REPOSITORY, {
    variables: queryVariables,
    fetchPolicy: "cache-and-network",
  });

  const repository = data?.repository;
  const reviewsConnection = repository?.reviews;
  const reviews = reviewsConnection?.edges?.map((edge) => edge.node) ?? [];
  const pageInfo = reviewsConnection?.pageInfo;

  const fetchMore = () => {
    if (loading || !pageInfo?.hasNextPage) {
      return;
    }

    return apolloFetchMore({
      variables: {
        ...queryVariables,
        after: pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult?.repository) {
          return previousResult;
        }

        const previousConnection = previousResult.repository.reviews;
        const nextConnection = fetchMoreResult.repository.reviews;

        return {
          ...previousResult,
          repository: {
            ...previousResult.repository,
            ...fetchMoreResult.repository,
            reviews: {
              ...previousConnection,
              ...nextConnection,
              edges: [...previousConnection.edges, ...nextConnection.edges],
            },
          },
        };
      },
    });
  };

  return {
    repository,
    reviews,
    loading,
    error,
    fetchMore,
    hasNextPage: pageInfo?.hasNextPage ?? false,
  };
};

export default useRepository;
