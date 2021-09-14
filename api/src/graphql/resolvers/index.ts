import itemResolver from './item'
import brandResolver from './brand'
import categoryResolver from './category'

const rootResolver = {
  ...itemResolver,
  ...brandResolver,
  ...categoryResolver
}

export default rootResolver
