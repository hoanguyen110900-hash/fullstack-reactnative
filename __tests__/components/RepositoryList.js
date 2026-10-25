import { render, within } from "@testing-library/react-native";
import { describe, it, expect } from "@jest/globals";
import { RepositoryListContainer } from "../../src/components/RepositoryList";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", async () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      const { getAllByTestId } = await render(
        <RepositoryListContainer
          repositories={repositories.edges.map(({ node }) => node)}
        />,
      );

      const repositoryItems = getAllByTestId("repositoryItem");
      const first = within(repositoryItems[0]);
      const second = within(repositoryItems[1]);

      expect(first.getByText("jaredpalmer/formik")).toBeTruthy();
      expect(
        first.getByText("Description: Build forms in React, without the tears"),
      ).toBeTruthy();
      expect(first.getByText("TypeScript")).toBeTruthy();
      expect(first.getByText("1.6k")).toBeTruthy();
      expect(first.getByText("21.9k")).toBeTruthy();
      expect(first.getByText("88")).toBeTruthy();
      expect(first.getByText("3")).toBeTruthy();

      expect(second.getByText("async-library/react-async")).toBeTruthy();
      expect(
        second.getByText(
          "Description: Flexible promise-based React data loader",
        ),
      ).toBeTruthy();
      expect(second.getByText("JavaScript")).toBeTruthy();
      expect(second.getByText("69")).toBeTruthy();
      expect(second.getByText("1.8k")).toBeTruthy();
      expect(second.getByText("72")).toBeTruthy();
      expect(second.getByText("3")).toBeTruthy();
    });
  });
});
