import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (variables) => {
  const queryVariables = {
    ...variables,
    first: 5,
  };

  const {
    data,
    loading,
    error,
    fetchMore: apolloFetchMore,
    ...result
  } = useQuery(GET_REPOSITORIES, {
    variables: queryVariables,
  });

  const connection = data?.repositories;
  const repositories = connection?.edges?.map((edge) => edge.node) ?? [];
  const pageInfo = connection?.pageInfo;

  const fetchMore = () => {
    if (loading || !pageInfo?.hasNextPage) {
      return;
    }

    return apolloFetchMore({
      variables: {
        ...queryVariables,
        after: pageInfo.endCursor,
      },
    });
  };

  return {
    ...result,
    repositories,
    loading,
    error,
    fetchMore,
    hasNextPage: pageInfo?.hasNextPage ?? false,
  };
};

export default useRepositories;
