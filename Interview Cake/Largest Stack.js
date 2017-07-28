// Solution
// We define two new stacks within our MaxStack class—stack holds all of our integers, and maxsStack holds our "maxima." We use maxsStack to keep our max up to date in constant time as we push() and pop():
//
// Whenever we push() a new item, we check to see if it's greater than or equal to the current max, which is at the top of maxsStack. If it is, we also push() it onto maxsStack.
// Whenever we pop(), we also pop() from the top of maxsStack if the item equals the top item in maxsStack.
  function MaxStack() {
    this.stack     = new Stack();
    this.maxsStack = new Stack();
}
//
// // Add a new item to the top of our stack. If the item is greater
// // than or equal to the last item in maxsStack, it's
// // the new max! So we'll add it to maxsStack.
MaxStack.prototype.push = function(item) {
    this.stack.push(item);
    if (!this.maxsStack.peek() || item >= this.maxsStack.peek()) {
        this.maxsStack.push(item);
    }
    return item;
};

// Remove and return the top item from our stack. If it equals
// the top item in maxsStack, they must have been pushed in together.
// So we'll pop it out of maxsStack too.
MaxStack.prototype.pop = function() {
    var item = this.stack.pop();
    if (item === this.maxsStack.peek()) {
        this.maxsStack.pop();
    }
    return item;
};

// The last item in maxsStack is the max item in our stack.
MaxStack.prototype.getMax = function() {
    return this.maxsStack.peek();
};

// Complexity
// O(1)O(1) time for push(), pop(), and getMax(). O(m)O(m) additional space, where mm is the number of operations performed on the stack.
//
// Notice that our time-efficient approach takes some additional space, while a lazy ↴ approach (simply walking through the stack to find the max integer whenever getMax() is called) took no additional space. We've traded some space efficiency for time efficiency.
//
// What We Learned
// Notice how in the solution we're spending time on push() and pop() so we can save time on getMax(). That's because we chose to optimize for the time cost of calls to getMax().
//
// But we could've chosen to optimize for something else. For example, if we expected we'd be running push() and pop() frequently and running getMax() rarely, we could have optimized for faster push() and pop() functions.
//
// Sometimes the first step in algorithm design is deciding what we're optimizing for. Start by considering the expected characteristics of the input.
