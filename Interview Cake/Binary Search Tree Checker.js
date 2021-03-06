// Brute force might be to keep track of all ancestors for each node to ensure it satisfies condition for all ancestors, but this will take up O(n^2)

// Solution
// We do a depth-first walk through the tree, testing each node for validity as we go. A given node is valid if it's greater than all the ancestral nodes it's in the right sub-tree of and less than all the ancestral nodes it's in the left-subtree of. Instead of keeping track of each ancestor to check these inequalities, we just check the largest number it must be greater than (its lowerBound) and the smallest number it must be less than (its upperBound).

  function isBinarySearchTree(treeRoot) {

    // start at the root, with an arbitrarily low lower bound
    // and an arbitrarily high upper bound
    var nodeAndBoundsStack = [];
    nodeAndBoundsStack.push({node: treeRoot, lowerBound: -Infinity, upperBound: Infinity});

    // depth-first traversal
    while (nodeAndBoundsStack.length) {
        var nodeAndBounds = nodeAndBoundsStack.pop();
        var node = nodeAndBounds.node,
            lowerBound = nodeAndBounds.lowerBound,
            upperBound = nodeAndBounds.upperBound;

        // if this node is invalid, we return false right away
        if (node.value <= lowerBound || node.value >= upperBound) {
            return false;
        }

        if (node.left) {
            // this node must be less than the current node
            nodeAndBoundsStack.push({node: node.left, lowerBound: lowerBound, upperBound: node.value});

        }
        if (node.right) {
            // this node must be greater than the current node
            nodeAndBoundsStack.push({node: node.right, lowerBound: node.value, upperBound: upperBound});
        }
    }

    // if none of the nodes were invalid, return true
    // (at this point we have checked all nodes)
    return true;
}

// Instead of allocating a stack ourselves, we could write a recursive function that uses the call stack ↴ . This would work, but it would be vulnerable to stack overflow. However, the code does end up quite a bit cleaner:
//
//   function isBinarySearchTree(treeRoot, lowerBound, upperBound) {
//
//     lowerBound = (typeof lowerBound !== 'undefined') ? lowerBound : -Infinity;
//     upperBound = (typeof upperBound !== 'undefined') ? upperBound :  Infinity;
//
//     if (!treeRoot) return true;
//
//     if (treeRoot.value >= upperBound || treeRoot.value <= lowerBound) {
//         return false;
//     }
//
//     return isBinarySearchTree(treeRoot.left, lowerBound, treeRoot.value) &&
//            isBinarySearchTree(treeRoot.right, treeRoot.value, upperBound);
//
// }
//
// Checking if an in-order traversal of the tree is sorted is a great answer too, especially if you're able to implement it without storing a full list of nodes.
//
// Complexity
// O(n) time and O(n) space.
//
// The time cost is easy: for valid binary search trees, we’ll have to check all nn nodes.
//
// Space is a little more complicated. Because we’re doing a depth first search, nodeAndBoundsStack will hold at most dd nodes where dd is the depth of the tree (the number of levels in the tree from the root node down to the lowest node). So we could say our space cost is O(d)O(d).
//
// But we can also relate dd to nn. In a balanced tree, dd is \log_{2}{n}log
// ​2
// ​​ n. And the more unbalanced the tree gets, the closer dd gets to nn.
//
// In the worst case, the tree is a straight line of right children from the root where every node in that line also has a left child. The traversal will walk down the line of right children, adding a new left child to the stack at each step. When the traversal hits the rightmost node, the stack will hold half of the nn total nodes in the tree. Half n is O(n)O(n), so our worst case space cost is O(n)O(n).
//
// Bonus
// What if the input tree has duplicate values?
//
// What We Learned
// We could think of this as a greedy ↴ approach. We start off by trying to solve the problem in just one walk through the tree. So we ask ourselves what values we need to track in order to do that. Which leads us to our stack that tracks upper and lower bounds.
//
// We could also think of this as a sort of "divide and conquer" approach. The idea in general behind divide and conquer is to break the problem down into two or more subproblems, solve them, and then use that solution to solve the original problem.
//
// In this case, we're dividing the problem into subproblems by saying, "This tree is a valid binary search tree if the left subtree is valid and the right subtree is valid." This is more apparent in the recursive formulation of the answer above.
//
// Of course, it's just fine that our approach could be thought of as greedy or could be thought of as divide and conquer. It can be both. The point here isn't to create strict categorizations so we can debate whether or not something "counts" as divide and conquer.
//
// Instead, the point is to recognize the underlying patterns behind algorithms, so we can get better at thinking through problems.
//
// Sometimes we'll have to kinda smoosh together two or more different patterns to get our answer.
