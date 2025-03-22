export default [
  {
    id: 1,
    question: "How do you create an empty list in Python?",
    options: ["list = {}", "list = []", "list = ()",  "list = set()"],
  },
  {
    id: 2,
    question: "Which method is used to add an element to the end of a list?",
    options: ["insert()", "extend()", "append()", "add()"],
  },
  {
    id: 3,
    question: "How do you sort a list in descending order?",
    options: ["list.sort(reverse=True)", "list.sorted(reverse=True)", "sort(list, reverse=True)", "list.sort_descending()" ],
  },
  {
    id: 4,
    question: "What is the output of my_list = [2, 4, 6] * 2 ?",
    options: ["[4, 8, 12]", "[2, 4, 6, 2, 4, 6]", "[2, 2, 4, 4, 6, 6]", "[[2, 4, 6], [2, 4, 6]]"],
  },
  {
    id: 5,
    question: "What does my_list[1:3] return if my_list = [10, 20, 30, 40, 50]?",
    options: ["[10, 20]", "[20, 30]", "[20, 30, 40]", "[30, 40]"],
  },
  {
    id: 6,
    question: "How is a tuple different from a list?",
    options: ["Tuples are immutable, lists are mutable", "Lists are immutable, tuples are mutable", "Tuples are slower than lists", "Tuples support item assignment"],
  },
  {
    id: 7,
    question: "Which syntax creates a tuple?",
    options: ["{1, 2, 3}", "[1, 2, 3]", "(1, 2, 3)", "tuple[1, 2, 3]"],
  },
  {
    id: 8,
    question: "What is the output of tuple((5,)) ?",
    options: ["(5,)", "5", "(5)", "Error"],
  },
  {
    id: 9,
    question: "Which method can be used to find the index of an element in a tuple?",
    options: ["find()", "index()", "search()", "position()"],
  },
  {
    id: 10,
    question: "What is the result of len((1, 2, 3, 4, 5))?",
    options: ["4", "5", "6", "(5,)"],
  },
  {
    id: 11,
    question: "Which of the following is the correct way to define a dictionary?",
    options: ["{1, 2, 3}", "{ 'a': 1, 'b': 2 }", "[1: 'a', 2: 'b']", "dict([1, 2, 3])"],
  },
  {
    id: 12,
    question: " What does dict.keys() return?",
    options: ["A list of keys", "A tuple of keys", "A set of keys", "A view object of keys"],
  },
  {
    id: 13,
    question: "How do you retrieve a value from a dictionary using a key?",
    options: ["dict.get(key)", "dict.retrieve(key)", "dict.value(key)", "dict.fetch(key)"],
  },
  {
    id: 14,
    question: "What is the result of len({'a': 1, 'b': 2, 'c': 3})? ",
    options: ["2", "3", "4", "1"],
  },
  {
    id: 15,
    question: "What will dict1.update(dict2) do?",
    options: ["Replace dict1 values with dict2 for matching keys", "Remove keys that are not in dict2", "Convert dict1 to a list", "Merge dictionaries without modifying dict1"],
  },
  {
    id: 16,
    question: "What is a key property of a set? ",
    options: ["Ordered and allows duplicates", "Unordered and allows duplicates", "Ordered and unique elements", "Unordered and unique elements"],
  },
  {
    id: 17,
    question: "How do you find the union of two sets A and B?",
    options: ["A & B", "A - B", "A | B", "A + B"],
  },
  {
    id: 18,
    question: "What will be the result of {1, 2, 3, 3, 2} ?",
    options: ["{1, 2, 3}", "{1, 2, 3, 3, 2}", "[1, 2, 3]", "(1, 2, 3)"],
  },
  {
    id: 19,
    question: "Which of the following is an example of f-string formatting?",
    options: ['print("Hello, {}".format(name))', 'print("Hello, %s" % name)', 'print(f"Hello, {name}")', 'print("Hello, " + name)'],
  },
  {
    id: 20,
    question: "What is the output of f'Value: {5 + 3}' ?",
    options: ["Value: {5 + 3}", "Value: 5 + 3", "Value: 8", "Value: Five plus three"],
  },
]

export const answers = [1,2,0,1,1,0,2,0,1,1,1,3,0,1,0,3,2,0,2,2]

