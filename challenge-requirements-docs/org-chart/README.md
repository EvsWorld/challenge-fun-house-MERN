### Org Chart

Challenge required querying and updating a company's organizational chart. The requirements specifically were to:

1. Get all (direct and non-direct) descendant nodes of a given node (the given node can be anyone in the tree structure).
2. Change the parent node of a given node (the given node can be anyone in the tree structure).

- They need to answer quickly, even with tons of nodes.
- Also, we can’t afford to lose this information, so persistence is required.
- Each node should have the following info:
  a) node identification
  b) who is the parent node
  c) who is the root node
  d) the height of the node. In the above example, height(root) = 0 and height(a) == 1.

My approach was to use a 'materialized paths' strategy in mongodb. Each node has a 'name' and 'path'. The path contains a comma seperated string containing its ancestors. Therefore, querying for a specific node's descendents is done by querying using RegExp in the 'path' field, like this:

```
Model.find({ path: new RegExp('Bob') }
```

#### My notes after finishing

There's one requirement I didn't explicitly address, and that is the part about the data to be stored in the node entities themselves. My solution has that information but it is not explicit. I used mongodb and what I believe is called 'materialized paths' pattern. So in each node is the path which includes the node's parent, the root, and if you were to count the paths then you'd of course have the level. I could have put those fields on the schema to have them be calculated on save and exist in the db, but I've always thought that it's best to not have duplicated/derived data in the db.
