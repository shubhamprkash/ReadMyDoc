// importing the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then imported schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// imported object and document schemas
import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'
import comment from './comment';

//  giveing our schema to the builder and provide the result to Sanity
export default createSchema({
  // nameing our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    post,
    author,
    category,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
    comment,
  ]),
})
