import * as InventoryService from '../repositories/inventory.services';
import { CreateItemDTO } from '../models';
import { Exact } from '../../generated/graphql';
import {useCallback} from 'react';

export function useInventoryViewModel() {

  const createItem = useCallback(
    (data: Exact<CreateItemDTO> | undefined) => {
      InventoryService.getItem({
        variables: data
      });
    },
    [],
  )

  return {
    createItem,
  }
}
