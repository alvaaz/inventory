import { useCreateItemMutation, namedOperations } from "../../generated/graphql";

export const [createItem, { loading: createItemLoading }] = useCreateItemMutation({
  refetchQueries: [namedOperations.Query.Items]
});

export const [getItem, { data: itemData }] = useItemLazyQuery();
