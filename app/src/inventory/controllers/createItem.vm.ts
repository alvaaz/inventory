import * as InventoryService from '../repositories/inventory.services';
import { CreateItemDTO } from '../models';
import { Exact } from '../../generated/graphql';
import {useCallback} from 'react';

export function useCreateItemViewModel() {

  const createItem = useCallback(
    (data: Exact<CreateItemDTO> | undefined) => {
      InventoryService.createItem({
        variables: data
      });
    },
    [],
  )

  return {
    createItem,
  }
}
