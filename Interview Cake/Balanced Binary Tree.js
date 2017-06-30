//Brute force might be to compare depths of every leaf to evey other leaf which gives us )(n^2)

// Solution
// We do a depth-first walk ↴ through our tree, keeping track of the depth as we go. When we find a leaf, we throw its depth into an array of depths if we haven't seen that depth already.
//
// Each time we hit a leaf with a new depth, there are two ways that our tree might now be unbalanced:
//
// There are more than 2 different leaf depths
// There are exactly 2 leaf depths and they are more than 1 apart.
// Why are we doing a depth-first walk and not a breadth-first ↴ one? You could make a case for either. We chose depth-first because it reaches leaves faster, which allows us to short-circuit earlier in some cases.

  function isBalanced(treeRoot) {

    // a tree with no nodes is superbalanced, since there are no leaves!
    if (!treeRoot) {
        return true;
    }

    var depths = []; // we short-circuit as soon as we find more than 2

    // nodes will store pairs of a node and the node's depth
    var nodes = [];
    nodes.push([treeRoot, 0]);

    while (nodes.length) {

        // pop a node and its depth from the top of our stack
        var nodePair = nodes.pop();
        var node  = nodePair[0],
            depth = nodePair[1];

        // case: we found a leaf
        if (!node.left && !node.right) {

            // we only care if it's a new depth
            if (depths.indexOf(depth) < 0) {
                depths.push(depth);

                // two ways we might now have an unbalanced tree:
                //   1) more than 2 different leaf depths
                //   2) 2 leaf depths that are more than 1 apart
                if ((depths.length > 2) ||
                        (depths.length === 2 && Math.abs(depths[0] - depths[1]) > 1)) {
                    return false;
                }
            }

        // case: this isn't a leaf - keep stepping down
        } else {
            if (node.left) {
                nodes.push([node.left, depth + 1]);
            }
            if (node.right) {
                nodes.push([node.right, depth + 1]);
            }
        }
    }

    return true;
}

// Complexity
// O(n) time and O(n) space.
//
// For time, the worst case is the tree is balanced and we have to iterate over all nn nodes to make sure.
//
// For the space cost, we have two data structures to watch: depths and nodes.
//
// depths will never hold more than three elements, so we can write that off as O(1)O(1).
//
// Because we’re doing a depth first search, nodes will hold at most dd nodes where dd is the depth of the tree (the number of levels in the tree from the root node down to the lowest node). So we could say our space cost is O(d)O(d).
//
// But we can also relate dd to nn. In a balanced tree, dd is O(\log_{2}(n))O(log
// ​2
// ​​ (n)). And the more unbalanced the tree gets, the closer dd gets to nn.
//
// In the worst case, the tree is a straight line of right children from the root where every node in that line also has a left child. The traversal will walk down the line of right children, adding a new left child to nodes at each step. When the traversal hits the rightmost node, nodes will hold half of the nn total nodes in the tree. Half n is O(n)O(n), so our worst case space cost is O(n)O(n).
//
// What We Learned
// This is an intro to some tree basics. If this is new to you, don't worry—it can take a few questions for this stuff to come together. We have a few more coming up.
//
// Particular things to note:
//
// Focus on depth-first ↴ vs breadth-first ↴ traversal. You should be very comfortable with the differences between the two and the strengths and weaknesses of each.
//
// You should also be very comfortable coding each of them up.
//
// One tip: Remember that breadth-first uses a queue ↴ and depth-first uses a stack ↴ (could be the call stack or an actual stack object). That's not just a clue about implementation, it also helps with figuring out the differences in behavior. Those differences come from whether we visit nodes in the order we see them (first in, first out) or we visit the last-seen node first (last in, first out).
