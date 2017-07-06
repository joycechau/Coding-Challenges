// Solution
// We can use a trie. If you've never heard of a trie, think of it this way:
//
// Let's make visited a nested object where each map has keys of just one character. So we would store 'google.com' as visited['g']['o']['o']['g']['l']['e']['.']['c']['o']['m']['*'] = true.
//
// The '*' at the end means 'this is the end of an entry'. Otherwise we wouldn't know what parts of visited are real URLs and which parts are just prefixes. In the example above, 'google.co' is a prefix that we might think is a visited URL if we didn't have some way to mark 'this is the end of an entry.'
//
// Now when we go to add 'google.com/maps' to visited, we only have to add the characters '/maps', because the 'google.com' prefix is already there. Same with 'google.com/about/jobs'.
//
// We can visualize this as a tree, where each character in a string corresponds to a node. To check if a string is in the trie, we just descend from the root of the tree to a leaf, checking for a node in the tree for each character of in string.
//
//
// A trie containing "donut.net", "dogood.org", "dog.com", "dog.com/about", "dog.com/pug", and "dog.org"
// How could we implement this structure? There are lots of ways! We could use nested objects, nodes and pointers, or some combination of the two. Evaluating the pros and cons of different options and choosing one is a great thing to do in a programming interview.
//
// In our implementation, we chose to use nested objects. To determine if a given site has been visited, we just call checkPresentAndAdd(), which checks if a given string is present in the trie and adds it to the trie if it's not.

  function Trie() {
    this.rootNode = {};
}

Trie.prototype.checkPresentAndAdd = function(word) {

    var currentNode = this.rootNode;
    var isNewWord = false;

    // Work downwards through the trie, adding nodes
    // as needed, and keeping track of whether we add
    // any nodes.
    for (var i = 0; i < word.length; i++) {
        var char = word[i];

        if (!currentNode.hasOwnProperty(char)) {
            isNewWord = true;
            currentNode[char] = {};
        }

        currentNode = currentNode[char];
    }

    // Explicitly mark the end of a word.
    // Otherwise, we might say a word is
    // present if it is a prefix of a different,
    // longer word that was added earlier.
    if (!currentNode.hasOwnProperty("End of Word")) {
        isNewWord = true;
        currentNode["End of Word"] = {};
    }

    return isNewWord;
}

// If you used a bloom filter, that's a great answer too. Especially if you use run-length encoding.
//
// Complexity
// How much space does this save? This is about to get MATHEMATICAL.
//
// How many characters were we storing in our flat object approach? Suppose visited includes all possible URLs of length 5 or fewer characters. Let's ignore non-alphabetical characters to simplify, sticking to the standard 26 English letters in lowercase. There are 26^526
// ​5
// ​​  different possible 5-character URLs (26 options for the first character, times 26 options for the 2nd character, etc), and of course 26^426
// ​4
// ​​  different possible 4-character URLs, etc. If we store each 5-character URL as a normal string in memory, we are storing 55 characters per string, for a total of 5 * 26^55∗26
// ​5
// ​​  characters for all possible 5-character strings (and 4 * 26^44∗26
// ​4
// ​​  total characters for all 4-character strings, etc). So for all 1, 2, 3, 4, or 5 character URLs, our total number of characters stored is:
//
// 5 * 26^5 + 4 * 26^4 + 3 * 26^3 + 2 * 26^2 + 1 * 26 ^ 15∗26
// ​5
// ​​ +4∗26
// ​4
// ​​ +3∗26
// ​3
// ​​ +2∗26
// ​2
// ​​ +1∗26
// ​1
// ​​
// So for all possible URLs of length nn or fewer, our total storage space is:
//
// n26^n + (n-1)26^{(n-1)} + . . . + 1 * 26 ^ 1n26
// ​n
// ​​ +(n−1)26
// ​(n−1)
// ​​ +...+1∗26
// ​1
// ​​
// This is O(n26^n)O(n26
// ​n
// ​​ ).
//
// How many characters are stored in our trie? The first layer has 26 nodes (and thus 26 characters), one for each possible starting character. On the second layer, each of those 26 nodes has 26 children, for a total of 26^226
// ​2
// ​​  nodes. The fifth layer has 26^526
// ​5
// ​​  nodes. To store all 1, 2, 3, 4, or 5 character URLs our trie will have 5 layers. So the total number of nodes is:
//
// 26^5 + 26^4 + 26^3 + 26^2 + 26^126
// ​5
// ​​ +26
// ​4
// ​​ +26
// ​3
// ​​ +26
// ​2
// ​​ +26
// ​1
// ​​
// So for all URLs of length nn or fewer, we have:
//
// 26^n + 26^{(n-1)} + ... + 26^126
// ​n
// ​​ +26
// ​(n−1)
// ​​ +...+26
// ​1
// ​​
// This is O(26^n)O(26
// ​n
// ​​ ). We've shaved off a factor of nn.
//
// Bonus trivia: although the HTTP spec allows for unlimited URL length, in practice many web browsers won't support URLs over 2,000 characters.
//
// What We Learned
// We ended up using a trie. Even if you've never heard of a trie before, you can reason your way to deriving one for this question. That's what we did: we started with a strategy for compressing a common prefix ("www") and then we asked ourselves, "How can we take this idea even further?" That gave us the idea to treat each character as a common prefix.
//
// That strategy—starting with a small optimization and asking, "How can we take this same idea even further?"—is hugely powerful. It's one of the keys to unlocking complex algorithms and data structures for problems you've never seen before.
