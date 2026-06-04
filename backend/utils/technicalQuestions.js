const technicalQuestionsData = {
  java: [
    {
      question: "What is the difference between JDK and JRE?",
      options: ["JDK is a development tool while JRE is runtime environment", "Both are the same", "JRE is larger than JDK", "JDK is only for Linux"],
      answer: "JDK is a development tool while JRE is runtime environment",
      difficulty: "easy"
    },
    {
      question: "Which keyword is used to prevent method overriding in Java?",
      options: ["static", "abstract", "final", "private"],
      answer: "final",
      difficulty: "easy"
    },
    {
      question: "What is the output of 10 / 3 in Java?",
      options: ["3.33", "3", "3.0", "Error"],
      answer: "3",
      difficulty: "easy"
    },
    {
      question: "Which exception is thrown when you divide by zero?",
      options: ["NullPointerException", "ArithmeticException", "NumberFormatException", "IllegalArgumentException"],
      answer: "ArithmeticException",
      difficulty: "easy"
    },
    {
      question: "What is the default value of a boolean variable in Java?",
      options: ["true", "false", "0", "null"],
      answer: "false",
      difficulty: "easy"
    },
    {
      question: "Which of the following is not a primitive data type in Java?",
      options: ["int", "String", "boolean", "double"],
      answer: "String",
      difficulty: "easy"
    },
    {
      question: "What is the purpose of the 'super' keyword in Java?",
      options: ["To access parent class methods and variables", "To create a new object", "To define a constant", "To exit a loop"],
      answer: "To access parent class methods and variables",
      difficulty: "medium"
    },
    {
      question: "Which access modifier allows access only within the same class?",
      options: ["public", "private", "protected", "default"],
      answer: "private",
      difficulty: "easy"
    },
    {
      question: "What is the correct way to create a singleton class in Java?",
      options: ["Using static instance and private constructor", "Using abstract class", "Using interface", "Using multiple constructors"],
      answer: "Using static instance and private constructor",
      difficulty: "medium"
    },
    {
      question: "Which of these is NOT a feature of Java?",
      options: ["Platform independent", "Pointer support", "Multithreading", "Garbage collection"],
      answer: "Pointer support",
      difficulty: "medium"
    },
    {
      question: "What is the difference between ArrayList and LinkedList?",
      options: ["ArrayList uses array, LinkedList uses doubly linked list", "Both are same", "LinkedList is faster for access", "ArrayList can't store null"],
      answer: "ArrayList uses array, LinkedList uses doubly linked list",
      difficulty: "medium"
    },
    {
      question: "How many times can a class implement an interface?",
      options: ["Only once", "Twice", "Multiple times", "Not possible"],
      answer: "Multiple times",
      difficulty: "easy"
    },
    {
      question: "What is the time complexity of HashMap get() operation?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
      answer: "O(1)",
      difficulty: "medium"
    },
    {
      question: "Which keyword is used for variable length arguments in Java?",
      options: ["...", "***", "...", "**"],
      answer: "...",
      difficulty: "medium"
    },
    {
      question: "What is the output of System.out.println(5 + 5 + \"5\");",
      options: ["555", "10", "105", "Error"],
      answer: "105",
      difficulty: "medium"
    },
    {
      question: "Which method is used to convert String to int in Java?",
      options: ["toInt()", "parseInt()", "convertToInt()", "stringToInt()"],
      answer: "parseInt()",
      difficulty: "easy"
    },
    {
      question: "What is the difference between == and .equals() in Java?",
      options: ["== compares references, .equals() compares values", "Both are same", ".equals() compares references", "== is used for primitives only"],
      answer: "== compares references, .equals() compares values",
      difficulty: "medium"
    },
    {
      question: "Which collection doesn't allow duplicate elements?",
      options: ["List", "Set", "Queue", "Stack"],
      answer: "Set",
      difficulty: "easy"
    },
    {
      question: "What is the correct order of exception handling in Java?",
      options: ["Specific to general", "General to specific", "Any order", "Alphabetical order"],
      answer: "Specific to general",
      difficulty: "medium"
    },
    {
      question: "How many bits does a long variable occupy in Java?",
      options: ["16 bits", "32 bits", "64 bits", "128 bits"],
      answer: "64 bits",
      difficulty: "easy"
    },
    {
      question: "What is the purpose of the 'volatile' keyword in Java?",
      options: ["To make variable thread-safe", "To prevent variable modification", "To increase performance", "To declare a constant"],
      answer: "To make variable thread-safe",
      difficulty: "hard"
    },
    {
      question: "Which exception is thrown by the JVM?",
      options: ["IOException", "SQLException", "OutOfMemoryError", "ParseException"],
      answer: "OutOfMemoryError",
      difficulty: "hard"
    },
    {
      question: "What is the difference between method overloading and overriding?",
      options: ["Overloading is same class, overriding is inheritance", "Both are in inheritance", "Overriding is same class", "They are the same"],
      answer: "Overloading is same class, overriding is inheritance",
      difficulty: "medium"
    },
    {
      question: "Which sorting algorithm is used by Collections.sort()?",
      options: ["Merge sort", "Quick sort", "Heap sort", "Bubble sort"],
      answer: "Merge sort",
      difficulty: "hard"
    },
    {
      question: "What is the difference between String, StringBuffer, and StringBuilder?",
      options: ["String is immutable, StringBuffer is thread-safe, StringBuilder is faster", "All are mutable", "All are immutable", "StringBuilder is thread-safe"],
      answer: "String is immutable, StringBuffer is thread-safe, StringBuilder is faster",
      difficulty: "hard"
    },
    {
      question: "How many objects are created in String s = new String(\"Java\");",
      options: ["1", "2", "3", "4"],
      answer: "2",
      difficulty: "hard"
    },
    {
      question: "What is the purpose of the transient keyword?",
      options: ["To prevent serialization of a field", "To make variable final", "To declare a constant", "To increase performance"],
      answer: "To prevent serialization of a field",
      difficulty: "hard"
    },
    {
      question: "Which package contains the Collection interface?",
      options: ["java.util", "java.lang", "java.io", "java.sql"],
      answer: "java.util",
      difficulty: "easy"
    },
    {
      question: "What is the default sorting order for TreeSet?",
      options: ["Ascending", "Descending", "Random", "Insertion order"],
      answer: "Ascending",
      difficulty: "easy"
    },
    {
      question: "How do you create an immutable list in Java?",
      options: ["Collections.unmodifiableList()", "new ImmutableList()", "List.immutable()", "final List<>"],
      answer: "Collections.unmodifiableList()",
      difficulty: "medium"
    },
    {
      question: "What is the time complexity of binary search?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
      answer: "O(log n)",
      difficulty: "medium"
    },
    {
      question: "Which interface should be implemented to make an object comparable?",
      options: ["Comparable", "Comparator", "Cloneable", "Serializable"],
      answer: "Comparable",
      difficulty: "medium"
    },
    {
      question: "What is the difference between throw and throws?",
      options: ["throw is for throwing exception, throws is for declaring", "Both are same", "throws is for throwing exception", "throw is for declaring"],
      answer: "throw is for throwing exception, throws is for declaring",
      difficulty: "medium"
    },
    {
      question: "Which method is called when an object is garbage collected?",
      options: ["finalize()", "destroy()", "cleanup()", "dispose()"],
      answer: "finalize()",
      difficulty: "hard"
    },
    {
      question: "What is the output of Math.max(5, 5.5)?",
      options: ["5", "5.5", "Error", "5.0"],
      answer: "5.5",
      difficulty: "easy"
    },
    {
      question: "Which of the following is a thread-safe collection?",
      options: ["Vector", "ArrayList", "HashMap", "HashSet"],
      answer: "Vector",
      difficulty: "medium"
    },
    {
      question: "What is the difference between Iterator and ListIterator?",
      options: ["ListIterator can go forward and backward", "Iterator is faster", "ListIterator is slower", "Both are same"],
      answer: "ListIterator can go forward and backward",
      difficulty: "medium"
    },
    {
      question: "What is the purpose of the 'synchronized' keyword?",
      options: ["To provide thread safety", "To increase performance", "To declare a constant", "To prevent inheritance"],
      answer: "To provide thread safety",
      difficulty: "hard"
    },
    {
      question: "Which collection maintains insertion order?",
      options: ["LinkedHashMap", "HashMap", "TreeMap", "WeakHashMap"],
      answer: "LinkedHashMap",
      difficulty: "medium"
    },
    {
      question: "What is the maximum size of an array in Java?",
      options: ["Integer.MAX_VALUE", "Long.MAX_VALUE", "2^31-1", "Unlimited"],
      answer: "Integer.MAX_VALUE",
      difficulty: "hard"
    },
    {
      question: "How do you prevent a class from being instantiated?",
      options: ["Make constructor private", "Make class final", "Make class abstract with private constructor", "Use interface"],
      answer: "Make constructor private",
      difficulty: "medium"
    },
    {
      question: "What is the purpose of the 'strictfp' keyword?",
      options: ["To restrict floating point calculations", "To increase performance", "To prevent inheritance", "To make class final"],
      answer: "To restrict floating point calculations",
      difficulty: "hard"
    },
    {
      question: "Which method is used to get the length of an array?",
      options: ["length()", "size()", "length", "getLength()"],
      answer: "length",
      difficulty: "easy"
    },
    {
      question: "What is the difference between Hashtable and HashMap?",
      options: ["Hashtable is synchronized, HashMap is not", "Both are same", "HashMap is synchronized", "Hashtable is faster"],
      answer: "Hashtable is synchronized, HashMap is not",
      difficulty: "medium"
    },
    {
      question: "How many times can you override a method?",
      options: ["Only once", "Depends on parent class", "Multiple times in subclasses", "Not possible"],
      answer: "Multiple times in subclasses",
      difficulty: "easy"
    },
    {
      question: "What is the output of 'true || false && false'?",
      options: ["true", "false", "Error", "null"],
      answer: "true",
      difficulty: "medium"
    },
    {
      question: "Which annotation is used for unit testing in Java?",
      options: ["@Test", "@RunWith", "@Suite", "@TestClass"],
      answer: "@Test",
      difficulty: "easy"
    },
    {
      question: "What is the purpose of the 'default' method in interface?",
      options: ["To provide default implementation", "To make variable constant", "To declare abstract method", "To create static method"],
      answer: "To provide default implementation",
      difficulty: "medium"
    },
    {
      question: "How do you create a custom exception in Java?",
      options: ["Extend Exception class", "Extend Error class", "Implement Throwable", "Create a new interface"],
      answer: "Extend Exception class",
      difficulty: "medium"
    },
    {
      question: "What is the time complexity of insertion in LinkedList?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
      answer: "O(1)",
      difficulty: "medium"
    },
    {
      question: "Which method is used to remove an element from ArrayList?",
      options: ["remove()", "delete()", "pop()", "shift()"],
      answer: "remove()",
      difficulty: "easy"
    }
  ],
  react: [
    {
      question: "What is JSX in React?",
      options: ["JavaScript XML", "Java Server XML", "JSON Extended", "JavaScript Extension"],
      answer: "JavaScript XML",
      difficulty: "easy"
    },
    {
      question: "What is the purpose of the useState hook?",
      options: ["To manage state in functional components", "To fetch data from API", "To handle routing", "To create context"],
      answer: "To manage state in functional components",
      difficulty: "easy"
    },
    {
      question: "What is the difference between state and props?",
      options: ["State is mutable, props are immutable", "Both are mutable", "Both are immutable", "Props are only for class components"],
      answer: "State is mutable, props are immutable",
      difficulty: "easy"
    },
    {
      question: "What is a controlled component in React?",
      options: ["A component whose value is controlled by React state", "A component that controls other components", "A component with lifecycle methods", "A component that doesn't re-render"],
      answer: "A component whose value is controlled by React state",
      difficulty: "medium"
    },
    {
      question: "What is the purpose of useEffect hook?",
      options: ["To handle side effects", "To manage state", "To create context", "To optimize performance"],
      answer: "To handle side effects",
      difficulty: "easy"
    },
    {
      question: "How do you prevent a component from rendering?",
      options: ["Return null", "Return false", "Return undefined", "Both A and B"],
      answer: "Return null",
      difficulty: "medium"
    },
    {
      question: "What is the difference between functional and class components?",
      options: ["Functional uses hooks, class uses lifecycle", "Both are the same", "Class components are faster", "Functional components can't have state"],
      answer: "Functional uses hooks, class uses lifecycle",
      difficulty: "medium"
    },
    {
      question: "What is the key prop used for in React lists?",
      options: ["To identify which items have changed", "To style list items", "To add CSS classes", "To set priority"],
      answer: "To identify which items have changed",
      difficulty: "easy"
    },
    {
      question: "What is the purpose of useCallback hook?",
      options: ["To memoize a callback function", "To create callbacks", "To handle events", "To manage state"],
      answer: "To memoize a callback function",
      difficulty: "hard"
    },
    {
      question: "What is the difference between React.memo and useMemo?",
      options: ["memo is for components, useMemo is for values", "Both are the same", "memo is for hooks", "useMemo is for components"],
      answer: "memo is for components, useMemo is for values",
      difficulty: "hard"
    },
    {
      question: "How do you handle form submission in React?",
      options: ["Using onSubmit handler with preventDefault", "Using onChange handler", "Using onClick handler", "Using onLoad handler"],
      answer: "Using onSubmit handler with preventDefault",
      difficulty: "easy"
    },
    {
      question: "What is prop drilling?",
      options: ["Passing props through multiple levels of components", "Drilling into props object", "Creating props dynamically", "Deleting props"],
      answer: "Passing props through multiple levels of components",
      difficulty: "medium"
    },
    {
      question: "What is context API used for?",
      options: ["To pass data through component tree without prop drilling", "To create state", "To handle routing", "To fetch data"],
      answer: "To pass data through component tree without prop drilling",
      difficulty: "medium"
    },
    {
      question: "What is the virtual DOM in React?",
      options: ["A lightweight representation of the real DOM", "The actual browser DOM", "A cache of API responses", "A state management system"],
      answer: "A lightweight representation of the real DOM",
      difficulty: "medium"
    },
    {
      question: "What is reconciliation in React?",
      options: ["The process of updating DOM based on changes", "Merging two objects", "Combining state and props", "Creating a new component"],
      answer: "The process of updating DOM based on changes",
      difficulty: "hard"
    },
    {
      question: "How do you pass arguments to an event handler in React?",
      options: ["Using arrow function or bind", "Using parentheses", "Using event object", "Using closure"],
      answer: "Using arrow function or bind",
      difficulty: "easy"
    },
    {
      question: "What is the purpose of lazy loading in React?",
      options: ["To load components only when needed", "To load all components at once", "To cache components", "To prevent re-renders"],
      answer: "To load components only when needed",
      difficulty: "medium"
    },
    {
      question: "What is suspense in React?",
      options: ["A component for handling async operations", "A lifecycle method", "A state management tool", "A routing component"],
      answer: "A component for handling async operations",
      difficulty: "hard"
    },
    {
      question: "How do you optimize React performance?",
      options: ["Using React.memo, useMemo, useCallback", "Using more components", "Adding more state", "Using inline functions"],
      answer: "Using React.memo, useMemo, useCallback",
      difficulty: "hard"
    },
    {
      question: "What is useReducer hook used for?",
      options: ["To manage complex state logic", "To fetch data", "To handle forms", "To create context"],
      answer: "To manage complex state logic",
      difficulty: "hard"
    },
    {
      question: "What is the difference between uncontrolled and controlled components?",
      options: ["Controlled components have their state managed by React", "Both are the same", "Uncontrolled is faster", "Controlled components use refs"],
      answer: "Controlled components have their state managed by React",
      difficulty: "medium"
    },
    {
      question: "How do you handle errors in React?",
      options: ["Using error boundary component", "Using try-catch", "Using event handlers", "Using lifecycle methods"],
      answer: "Using error boundary component",
      difficulty: "hard"
    },
    {
      question: "What is the purpose of dangerouslySetInnerHTML?",
      options: ["To set HTML content from a string", "To bypass React security", "To improve performance", "To handle XSS attacks"],
      answer: "To set HTML content from a string",
      difficulty: "medium"
    },
    {
      question: "How do you create a portal in React?",
      options: ["Using ReactDOM.createPortal", "Using createPortal hook", "Using Portal component", "Using usePortal"],
      answer: "Using ReactDOM.createPortal",
      difficulty: "hard"
    },
    {
      question: "What is the purpose of Fragment?",
      options: ["To group elements without adding extra DOM nodes", "To create a new component", "To manage state", "To handle events"],
      answer: "To group elements without adding extra DOM nodes",
      difficulty: "easy"
    },
    {
      question: "How do you prevent unnecessary re-renders?",
      options: ["Using React.memo, useMemo, useCallback", "Using useState", "Using props", "Using context"],
      answer: "Using React.memo, useMemo, useCallback",
      difficulty: "medium"
    },
    {
      question: "What is the purpose of forwardRef?",
      options: ["To forward refs to child components", "To create forward declarations", "To manage refs", "To improve performance"],
      answer: "To forward refs to child components",
      difficulty: "hard"
    },
    {
      question: "How do you handle async operations in useEffect?",
      options: ["Using async function inside useEffect or creating wrapper", "useEffect is not async", "Using setTimeout", "Using promises only"],
      answer: "Using async function inside useEffect or creating wrapper",
      difficulty: "medium"
    },
    {
      question: "What is the purpose of useRef hook?",
      options: ["To access DOM nodes directly", "To manage state", "To handle events", "To create context"],
      answer: "To access DOM nodes directly",
      difficulty: "easy"
    },
    {
      question: "What is the difference between React and React-DOM?",
      options: ["React is core library, React-DOM renders to browser", "Both are the same", "React-DOM is for mobile", "React is for styling"],
      answer: "React is core library, React-DOM renders to browser",
      difficulty: "medium"
    },
    {
      question: "How do you test React components?",
      options: ["Using Jest and React Testing Library", "Using Selenium", "Using Cypress", "Using Mocha"],
      answer: "Using Jest and React Testing Library",
      difficulty: "easy"
    },
    {
      question: "What is the purpose of React Router?",
      options: ["To handle client-side routing", "To handle server-side routing", "To manage state", "To handle API calls"],
      answer: "To handle client-side routing",
      difficulty: "easy"
    },
    {
      question: "How do you pass multiple props efficiently?",
      options: ["Using spread operator", "Passing individually", "Using array", "Using object destructuring"],
      answer: "Using spread operator",
      difficulty: "easy"
    },
    {
      question: "What is the purpose of custom hooks?",
      options: ["To reuse state logic across components", "To replace class components", "To improve performance", "To handle errors"],
      answer: "To reuse state logic across components",
      difficulty: "medium"
    },
    {
      question: "What is the difference between shallow and deep copy in React?",
      options: ["Shallow copies references, deep copies values", "Both are the same", "Deep copy is faster", "Shallow copy creates new object"],
      answer: "Shallow copies references, deep copies values",
      difficulty: "hard"
    },
    {
      question: "How do you debug React applications?",
      options: ["Using React Developer Tools and console.log", "Using print statements", "Using breakpoints only", "Using debugger keyword"],
      answer: "Using React Developer Tools and console.log",
      difficulty: "medium"
    },
    {
      question: "What is the purpose of useContext hook?",
      options: ["To consume context values", "To create context", "To manage state", "To handle events"],
      answer: "To consume context values",
      difficulty: "medium"
    },
    {
      question: "How do you handle conditional rendering in React?",
      options: ["Using if-else, ternary, &&, or conditional components", "Using switch-case only", "Using loop", "Using event handlers"],
      answer: "Using if-else, ternary, &&, or conditional components",
      difficulty: "easy"
    },
    {
      question: "What is the difference between props and state in functional components?",
      options: ["Props are input, state is internal", "Both are input", "Both are internal", "State is input"],
      answer: "Props are input, state is internal",
      difficulty: "easy"
    },
    {
      question: "How do you manage forms in React?",
      options: ["Using controlled components with state", "Using uncontrolled components", "Using refs only", "Using context only"],
      answer: "Using controlled components with state",
      difficulty: "medium"
    },
    {
      question: "What is the purpose of Strict Mode in React?",
      options: ["To highlight potential issues in development", "To improve production performance", "To handle errors", "To prevent bugs"],
      answer: "To highlight potential issues in development",
      difficulty: "medium"
    },
    {
      question: "How do you handle authentication in React?",
      options: ["Using context, localStorage, and JWT tokens", "Using cookies only", "Using sessions", "Using local variables"],
      answer: "Using context, localStorage, and JWT tokens",
      difficulty: "hard"
    },
    {
      question: "What is the purpose of key prop in lists?",
      options: ["To identify elements and maintain their state", "To style list items", "To add CSS classes", "To sort items"],
      answer: "To identify elements and maintain their state",
      difficulty: "medium"
    }
  ],
  javascript: [
    {
      question: "What is the difference between var, let, and const?",
      options: ["var is function-scoped, let and const are block-scoped", "All are the same", "let is function-scoped", "const is global"],
      answer: "var is function-scoped, let and const are block-scoped",
      difficulty: "easy"
    },
    {
      question: "What is hoisting in JavaScript?",
      options: ["Moving declarations to the top of scope", "Lifting objects", "Increasing performance", "Creating new variables"],
      answer: "Moving declarations to the top of scope",
      difficulty: "medium"
    },
    {
      question: "What is the difference between == and ===?",
      options: ["== does type coercion, === doesn't", "Both are the same", "=== is faster", "== is more strict"],
      answer: "== does type coercion, === doesn't",
      difficulty: "easy"
    },
    {
      question: "What is a closure in JavaScript?",
      options: ["A function that has access to outer scope", "A loop that closes", "A variable scope", "A function declaration"],
      answer: "A function that has access to outer scope",
      difficulty: "medium"
    },
    {
      question: "What is the difference between null and undefined?",
      options: ["null is intentional absence, undefined is unintentional", "Both are the same", "undefined is intentional", "null is a variable"],
      answer: "null is intentional absence, undefined is unintentional",
      difficulty: "easy"
    },
    {
      question: "What is the prototype in JavaScript?",
      options: ["An object from which other objects inherit", "A function template", "A design pattern", "A class declaration"],
      answer: "An object from which other objects inherit",
      difficulty: "medium"
    },
    {
      question: "What is the difference between call, apply, and bind?",
      options: ["All set 'this' but call/apply execute immediately, bind returns function", "All do the same thing", "call is only for arrays", "apply is only for functions"],
      answer: "All set 'this' but call/apply execute immediately, bind returns function",
      difficulty: "hard"
    },
    {
      question: "What is an arrow function?",
      options: ["A concise function syntax that doesn't have its own 'this'", "A function with arrows as parameters", "A recursive function", "A function in an arrow shape"],
      answer: "A concise function syntax that doesn't have its own 'this'",
      difficulty: "easy"
    },
    {
      question: "What is destructuring in JavaScript?",
      options: ["Extracting values from objects or arrays", "Breaking down objects", "Creating new objects", "Deleting object properties"],
      answer: "Extracting values from objects or arrays",
      difficulty: "easy"
    },
    {
      question: "What is the spread operator used for?",
      options: ["To expand iterables into individual elements", "To combine strings", "To merge objects only", "To create arrays"],
      answer: "To expand iterables into individual elements",
      difficulty: "easy"
    },
    {
      question: "What is the output of typeof null in JavaScript?",
      options: ["object", "null", "undefined", "error"],
      answer: "object",
      difficulty: "medium"
    },
    {
      question: "What is the difference between map and forEach?",
      options: ["map returns new array, forEach returns undefined", "Both return arrays", "forEach returns array", "map returns undefined"],
      answer: "map returns new array, forEach returns undefined",
      difficulty: "easy"
    },
    {
      question: "What is a Promise in JavaScript?",
      options: ["An object representing eventual completion or failure", "A guarantee of a result", "A synchronous operation", "A callback function"],
      answer: "An object representing eventual completion or failure",
      difficulty: "medium"
    },
    {
      question: "What is async/await?",
      options: ["Syntax sugar for working with promises", "A loop structure", "A conditional statement", "An error handler"],
      answer: "Syntax sugar for working with promises",
      difficulty: "medium"
    },
    {
      question: "What is the output of [1,2,3].map(x => x * 2)?",
      options: ["[2,4,6]", "undefined", "6", "NaN"],
      answer: "[2,4,6]",
      difficulty: "easy"
    },
    {
      question: "What is the difference between find and filter?",
      options: ["find returns first match, filter returns all matches", "Both return all matches", "filter returns first match", "Both return single value"],
      answer: "find returns first match, filter returns all matches",
      difficulty: "easy"
    },
    {
      question: "What is the purpose of reduce?",
      options: ["To reduce array to single value", "To reduce array size", "To filter array", "To map array"],
      answer: "To reduce array to single value",
      difficulty: "medium"
    },
    {
      question: "What is the difference between Object.assign and spread operator?",
      options: ["Both create shallow copies, spread is cleaner", "Object.assign is better", "spread is only for arrays", "Object.assign is faster"],
      answer: "Both create shallow copies, spread is cleaner",
      difficulty: "hard"
    },
    {
      question: "What is event delegation?",
      options: ["Handling events on parent instead of child", "Moving events to parent", "Creating events", "Deleting events"],
      answer: "Handling events on parent instead of child",
      difficulty: "medium"
    },
    {
      question: "What is the purpose of setTimeout?",
      options: ["To execute code after delay", "To set time limit", "To measure time", "To create timer"],
      answer: "To execute code after delay",
      difficulty: "easy"
    },
    {
      question: "What is a template literal in JavaScript?",
      options: ["String with backticks allowing interpolation", "A regular string", "A string method", "A function template"],
      answer: "String with backticks allowing interpolation",
      difficulty: "easy"
    },
    {
      question: "What is the difference between slice and splice?",
      options: ["slice doesn't modify, splice modifies array", "Both modify array", "Both don't modify", "slice modifies array"],
      answer: "slice doesn't modify, splice modifies array",
      difficulty: "easy"
    },
    {
      question: "What is the output of '5' + 3 in JavaScript?",
      options: ["53", "8", "Error", "undefined"],
      answer: "53",
      difficulty: "easy"
    },
    {
      question: "What is the purpose of JSON.stringify and JSON.parse?",
      options: ["stringify converts object to string, parse converts string to object", "Both convert to string", "Both convert to object", "stringify is slower"],
      answer: "stringify converts object to string, parse converts string to object",
      difficulty: "easy"
    },
    {
      question: "What is the difference between Object.keys and Object.entries?",
      options: ["keys returns key names, entries returns [key, value] pairs", "Both return keys", "entries is faster", "keys is deprecated"],
      answer: "keys returns key names, entries returns [key, value] pairs",
      difficulty: "easy"
    },
    {
      question: "What is the purpose of finally block?",
      options: ["Code that executes regardless of try/catch result", "To catch errors only", "To finally end program", "To retry code"],
      answer: "Code that executes regardless of try/catch result",
      difficulty: "medium"
    },
    {
      question: "What is the difference between for...in and for...of?",
      options: ["for...in iterates over keys, for...of iterates over values", "Both iterate over keys", "Both iterate over values", "for...in is faster"],
      answer: "for...in iterates over keys, for...of iterates over values",
      difficulty: "medium"
    },
    {
      question: "What is a WeakMap in JavaScript?",
      options: ["Map with weak references to keys", "A regular map", "A map with less features", "A deprecated feature"],
      answer: "Map with weak references to keys",
      difficulty: "hard"
    },
    {
      question: "What is the purpose of Object.freeze?",
      options: ["To prevent modifications to an object", "To stop execution", "To create constant", "To delete properties"],
      answer: "To prevent modifications to an object",
      difficulty: "hard"
    },
    {
      question: "What is the output of 0.1 + 0.2 === 0.3 in JavaScript?",
      options: ["false", "true", "Error", "undefined"],
      answer: "false",
      difficulty: "hard"
    },
    {
      question: "What is the purpose of Symbol in JavaScript?",
      options: ["To create unique identifiers", "To create symbols like $", "To define functions", "To mark variables"],
      answer: "To create unique identifiers",
      difficulty: "hard"
    },
    {
      question: "What is the difference between regular expression and string methods?",
      options: ["RegEx is more powerful for pattern matching", "String methods are faster", "RegEx only works with strings", "Both are equivalent"],
      answer: "RegEx is more powerful for pattern matching",
      difficulty: "medium"
    },
    {
      question: "What is the purpose of setInterval?",
      options: ["To execute code repeatedly at intervals", "To set timer once", "To pause execution", "To measure performance"],
      answer: "To execute code repeatedly at intervals",
      difficulty: "easy"
    },
    {
      question: "What is the difference between string concat and + operator?",
      options: ["Both concatenate strings, + is more common", "concat is faster", "concat only works with strings", "+ operator has issues"],
      answer: "Both concatenate strings, + is more common",
      difficulty: "easy"
    },
    {
      question: "What is the purpose of Array.from?",
      options: ["To convert array-like objects to arrays", "To create new array", "To copy array", "To combine arrays"],
      answer: "To convert array-like objects to arrays",
      difficulty: "medium"
    },
    {
      question: "What is the difference between includes and indexOf?",
      options: ["includes returns boolean, indexOf returns index", "Both return boolean", "Both return index", "includes is deprecated"],
      answer: "includes returns boolean, indexOf returns index",
      difficulty: "easy"
    },
    {
      question: "What is a generator function in JavaScript?",
      options: ["Function that can pause and resume execution", "Function that generates code", "Function that creates objects", "Function with special syntax"],
      answer: "Function that can pause and resume execution",
      difficulty: "hard"
    },
    {
      question: "What is the purpose of Object.defineProperty?",
      options: ["To define property with specific descriptor", "To create property", "To delete property", "To modify property name"],
      answer: "To define property with specific descriptor",
      difficulty: "hard"
    },
    {
      question: "What is the output of typeof [] in JavaScript?",
      options: ["object", "array", "undefined", "error"],
      answer: "object",
      difficulty: "easy"
    },
    {
      question: "What is the purpose of Proxy in JavaScript?",
      options: ["To intercept and customize object operations", "To create proxy server", "To improve performance", "To manage memory"],
      answer: "To intercept and customize object operations",
      difficulty: "hard"
    },
    {
      question: "What is the difference between shallow and deep cloning?",
      options: ["shallow copies first level, deep copies all levels", "Both copy all levels", "shallow is faster", "deep is not possible"],
      answer: "shallow copies first level, deep copies all levels",
      difficulty: "medium"
    },
    {
      question: "What is the purpose of Array.isArray?",
      options: ["To check if value is an array", "To create array", "To convert to array", "To validate array type"],
      answer: "To check if value is an array",
      difficulty: "easy"
    }
  ],
  dbms: [
    {
      question: "What is DBMS?",
      options: ["Software for managing databases", "Database design tool", "Query language", "Server software"],
      answer: "Software for managing databases",
      difficulty: "easy"
    },
    {
      question: "What is normalization?",
      options: ["Process of organizing data to minimize redundancy", "Creating normal databases", "Validating data", "Backup process"],
      answer: "Process of organizing data to minimize redundancy",
      difficulty: "medium"
    },
    {
      question: "What is the purpose of foreign key?",
      options: ["To establish relationship between tables", "To identify records", "To sort records", "To secure data"],
      answer: "To establish relationship between tables",
      difficulty: "easy"
    },
    {
      question: "What is ACID property?",
      options: ["Atomicity, Consistency, Isolation, Durability", "Accurate, Clear, Important, Data", "Atomicity, Completion, Information, Details", "None of above"],
      answer: "Atomicity, Consistency, Isolation, Durability",
      difficulty: "medium"
    },
    {
      question: "What is the difference between primary and unique key?",
      options: ["Primary key identifies record, unique key prevents duplicates", "Both are same", "Unique key is primary", "Primary key is optional"],
      answer: "Primary key identifies record, unique key prevents duplicates",
      difficulty: "medium"
    },
    {
      question: "What is a view in database?",
      options: ["Virtual table created from query", "Table visualization", "Database view", "Query result"],
      answer: "Virtual table created from query",
      difficulty: "medium"
    },
    {
      question: "What is indexing in database?",
      options: ["Data structure for faster retrieval", "Listing database objects", "Sorting records", "Creating references"],
      answer: "Data structure for faster retrieval",
      difficulty: "medium"
    },
    {
      question: "What is a transaction?",
      options: ["Sequence of operations treated as single unit", "Money transfer", "Database backup", "Query execution"],
      answer: "Sequence of operations treated as single unit",
      difficulty: "easy"
    },
    {
      question: "What is normalization first form (1NF)?",
      options: ["No repeating groups in table", "No dependencies", "No nulls allowed", "No duplicates"],
      answer: "No repeating groups in table",
      difficulty: "medium"
    },
    {
      question: "What is the purpose of JOIN operation?",
      options: ["To combine rows from multiple tables", "To join tables permanently", "To create new table", "To merge databases"],
      answer: "To combine rows from multiple tables",
      difficulty: "easy"
    },
    {
      question: "What is the difference between INNER and OUTER JOIN?",
      options: ["INNER returns matching rows, OUTER returns all rows", "Both return same rows", "INNER is slower", "OUTER is for views"],
      answer: "INNER returns matching rows, OUTER returns all rows",
      difficulty: "medium"
    },
    {
      question: "What is a stored procedure?",
      options: ["Pre-written SQL code stored in database", "Procedure to store data", "Backup procedure", "Query optimization"],
      answer: "Pre-written SQL code stored in database",
      difficulty: "medium"
    },
    {
      question: "What is a trigger?",
      options: ["Automatic action executed in response to event", "Starting database", "Causing errors", "Triggering backup"],
      answer: "Automatic action executed in response to event",
      difficulty: "hard"
    },
    {
      question: "What is the purpose of GROUP BY clause?",
      options: ["To group rows with same values", "To sort groups", "To filter groups", "To count rows"],
      answer: "To group rows with same values",
      difficulty: "easy"
    },
    {
      question: "What is deadlock in database?",
      options: ["Two transactions waiting for each other's resources", "Database locked state", "Server crash", "Query timeout"],
      answer: "Two transactions waiting for each other's resources",
      difficulty: "hard"
    },
    {
      question: "What is the difference between DELETE and TRUNCATE?",
      options: ["DELETE removes rows, TRUNCATE removes all quickly", "Both are same", "TRUNCATE is slower", "DELETE is for tables"],
      answer: "DELETE removes rows, TRUNCATE removes all quickly",
      difficulty: "medium"
    },
    {
      question: "What is a foreign key constraint?",
      options: ["Ensures referential integrity between tables", "Restricts table access", "Prevents modifications", "Validates input"],
      answer: "Ensures referential integrity between tables",
      difficulty: "medium"
    },
    {
      question: "What is the purpose of HAVING clause?",
      options: ["To filter groups based on conditions", "To filter individual rows", "To create groups", "To join tables"],
      answer: "To filter groups based on conditions",
      difficulty: "medium"
    },
    {
      question: "What is a composite key?",
      options: ["Primary key made of multiple columns", "Multiple keys", "Key for relationships", "Secondary key"],
      answer: "Primary key made of multiple columns",
      difficulty: "medium"
    },
    {
      question: "What is the difference between UNION and UNION ALL?",
      options: ["UNION removes duplicates, UNION ALL keeps them", "Both are same", "UNION ALL removes duplicates", "UNION is slower"],
      answer: "UNION removes duplicates, UNION ALL keeps them",
      difficulty: "medium"
    },
    {
      question: "What is a schema in database?",
      options: ["Collection of tables and objects", "Design of database", "Database structure", "All of above"],
      answer: "Collection of tables and objects",
      difficulty: "easy"
    },
    {
      question: "What is the purpose of cursor?",
      options: ["To process rows returned by query", "To point at database", "To select data", "To delete rows"],
      answer: "To process rows returned by query",
      difficulty: "hard"
    },
    {
      question: "What is a CHECK constraint?",
      options: ["Validates data based on condition", "Checks table structure", "Verifies integrity", "Validates syntax"],
      answer: "Validates data based on condition",
      difficulty: "medium"
    },
    {
      question: "What is the difference between DROP and TRUNCATE?",
      options: ["DROP removes structure and data, TRUNCATE removes only data", "Both are same", "TRUNCATE removes structure", "DROP is for rows"],
      answer: "DROP removes structure and data, TRUNCATE removes only data",
      difficulty: "medium"
    },
    {
      question: "What is query optimization?",
      options: ["Process of making queries execute faster", "Creating queries", "Validating queries", "Storing queries"],
      answer: "Process of making queries execute faster",
      difficulty: "medium"
    }
  ],
  "operating-systems": [
    {
      question: "What is an operating system?",
      options: ["Software that manages hardware and provides services to applications", "System software", "Application software", "Utility software"],
      answer: "Software that manages hardware and provides services to applications",
      difficulty: "easy"
    },
    {
      question: "What is the purpose of an operating system?",
      options: ["To manage resources and provide interface between user and hardware", "To run applications only", "To provide security only", "To manage memory only"],
      answer: "To manage resources and provide interface between user and hardware",
      difficulty: "easy"
    },
    {
      question: "What is multitasking?",
      options: ["Executing multiple processes at same time", "Executing tasks one by one", "Running single process", "Managing tasks"],
      answer: "Executing multiple processes at same time",
      difficulty: "easy"
    },
    {
      question: "What is a process?",
      options: ["Program in execution with its own memory space", "Program file", "Running application", "System service"],
      answer: "Program in execution with its own memory space",
      difficulty: "easy"
    },
    {
      question: "What is the difference between process and thread?",
      options: ["Process is independent, thread shares memory with other threads", "Both are same", "Thread is process", "Process is lightweight"],
      answer: "Process is independent, thread shares memory with other threads",
      difficulty: "medium"
    },
    {
      question: "What is CPU scheduling?",
      options: ["Process of allocating CPU time to processes", "Scheduling CPU tasks", "CPU timer", "CPU speed"],
      answer: "Process of allocating CPU time to processes",
      difficulty: "medium"
    },
    {
      question: "What is preemption in scheduling?",
      options: ["Interrupting running process to give CPU to another", "Scheduling processes", "Ending process", "Starting process"],
      answer: "Interrupting running process to give CPU to another",
      difficulty: "hard"
    },
    {
      question: "What is a semaphore?",
      options: ["Synchronization primitive for process synchronization", "Traffic signal", "System signal", "Process identifier"],
      answer: "Synchronization primitive for process synchronization",
      difficulty: "hard"
    },
    {
      question: "What is deadlock?",
      options: ["Situation where processes wait indefinitely for resources", "Deadend", "Process termination", "Memory error"],
      answer: "Situation where processes wait indefinitely for resources",
      difficulty: "hard"
    },
    {
      question: "What is thrashing?",
      options: ["Excessive paging that decreases performance", "Disk failure", "Memory leak", "CPU overload"],
      answer: "Excessive paging that decreases performance",
      difficulty: "hard"
    },
    {
      question: "What is virtual memory?",
      options: ["Using disk space as extension of RAM", "Memory allocation", "Physical memory", "Cache memory"],
      answer: "Using disk space as extension of RAM",
      difficulty: "medium"
    },
    {
      question: "What is paging?",
      options: ["Memory management technique dividing memory into pages", "Reading pages", "Writing memory", "Page replacement"],
      answer: "Memory management technique dividing memory into pages",
      difficulty: "medium"
    },
    {
      question: "What is segmentation?",
      options: ["Memory management where memory divided into segments of variable size", "Dividing hard disk", "Partitioning memory", "Memory layout"],
      answer: "Memory management where memory divided into segments of variable size",
      difficulty: "hard"
    },
    {
      question: "What is the difference between interrupt and exception?",
      options: ["Interrupt is external signal, exception is internal error", "Both are same", "Exception is external", "Interrupt is internal"],
      answer: "Interrupt is external signal, exception is internal error",
      difficulty: "hard"
    },
    {
      question: "What is the purpose of interrupt handler?",
      options: ["To handle interrupts and perform required actions", "To handle exceptions", "To manage processes", "To allocate resources"],
      answer: "To handle interrupts and perform required actions",
      difficulty: "medium"
    },
    {
      question: "What is context switching?",
      options: ["Saving context of one process and loading another", "Switching between applications", "Memory switching", "CPU switching"],
      answer: "Saving context of one process and loading another",
      difficulty: "medium"
    },
    {
      question: "What is mutual exclusion?",
      options: ["Ensuring only one process accesses resource at a time", "Excluding processes", "Resource exclusion", "Process termination"],
      answer: "Ensuring only one process accesses resource at a time",
      difficulty: "hard"
    },
    {
      question: "What is the purpose of mutex?",
      options: ["To prevent multiple threads from accessing same resource", "Mutual service", "Thread management", "Process communication"],
      answer: "To prevent multiple threads from accessing same resource",
      difficulty: "hard"
    },
    {
      question: "What is starvation in OS?",
      options: ["Situation where process never gets CPU time", "Memory shortage", "Disk full", "Resource unavailable"],
      answer: "Situation where process never gets CPU time",
      difficulty: "hard"
    },
    {
      question: "What is a file system?",
      options: ["Structure for storing and organizing files on disk", "System files", "File storage", "Directory structure"],
      answer: "Structure for storing and organizing files on disk",
      difficulty: "medium"
    },
    {
      question: "What is the difference between hard link and soft link?",
      options: ["Hard link is direct reference, soft link is indirect", "Both are same", "Soft link is faster", "Hard link is shortcut"],
      answer: "Hard link is direct reference, soft link is indirect",
      difficulty: "hard"
    },
    {
      question: "What is inode in file system?",
      options: ["Data structure storing file metadata", "File index", "File number", "Disk location"],
      answer: "Data structure storing file metadata",
      difficulty: "hard"
    },
    {
      question: "What is the purpose of working directory?",
      options: ["Current directory from which commands are executed", "Directory for work files", "System directory", "Backup directory"],
      answer: "Current directory from which commands are executed",
      difficulty: "easy"
    },
    {
      question: "What is pipe in OS?",
      options: ["Communication channel between processes", "Water pipe", "Pipeline execution", "Process connection"],
      answer: "Communication channel between processes",
      difficulty: "medium"
    },
    {
      question: "What is the difference between daemon and service?",
      options: ["Daemon runs in background, service manages resources", "Both are same", "Service runs in background", "Daemon manages resources"],
      answer: "Daemon runs in background, service manages resources",
      difficulty: "hard"
    }
  ],
  "computer-networks": [
    {
      question: "What is a network?",
      options: ["Connected computers sharing resources", "Computer connections", "Communication system", "Data transfer"],
      answer: "Connected computers sharing resources",
      difficulty: "easy"
    },
    {
      question: "What is the OSI model?",
      options: ["7-layer framework for network communication", "Operating System Interface", "Network model", "Protocol model"],
      answer: "7-layer framework for network communication",
      difficulty: "easy"
    },
    {
      question: "What are the 7 layers of OSI model?",
      options: ["Physical, Data Link, Network, Transport, Session, Presentation, Application", "1 to 7 layers", "Physical to Application", "Bottom to top layers"],
      answer: "Physical, Data Link, Network, Transport, Session, Presentation, Application",
      difficulty: "medium"
    },
    {
      question: "What is the difference between TCP and UDP?",
      options: ["TCP is reliable with connection, UDP is unreliable without connection", "Both are same", "UDP is reliable", "TCP is without connection"],
      answer: "TCP is reliable with connection, UDP is unreliable without connection",
      difficulty: "medium"
    },
    {
      question: "What is IP address?",
      options: ["Unique identifier for device on network", "Internet Protocol", "Network address", "Device identifier"],
      answer: "Unique identifier for device on network",
      difficulty: "easy"
    },
    {
      question: "What is the difference between IPv4 and IPv6?",
      options: ["IPv4 is 32-bit, IPv6 is 128-bit", "Both are 32-bit", "IPv4 is 128-bit", "Both are same"],
      answer: "IPv4 is 32-bit, IPv6 is 128-bit",
      difficulty: "medium"
    },
    {
      question: "What is MAC address?",
      options: ["Physical address of device on local network", "Maximum address", "Machine address", "Network address"],
      answer: "Physical address of device on local network",
      difficulty: "easy"
    },
    {
      question: "What is DNS?",
      options: ["System translating domain names to IP addresses", "Data Network System", "Domain Name", "Network Service"],
      answer: "System translating domain names to IP addresses",
      difficulty: "easy"
    },
    {
      question: "What is a firewall?",
      options: ["Security system controlling network traffic", "Wall on fire", "Network wall", "Security wall"],
      answer: "Security system controlling network traffic",
      difficulty: "easy"
    },
    {
      question: "What is a proxy server?",
      options: ["Server that acts as intermediary between client and server", "Server with permissions", "Substitute server", "Backup server"],
      answer: "Server that acts as intermediary between client and server",
      difficulty: "medium"
    },
    {
      question: "What is the purpose of DHCP?",
      options: ["To automatically assign IP addresses to devices", "Device Host Configuration", "Dynamic Host Protocol", "Network assignment"],
      answer: "To automatically assign IP addresses to devices",
      difficulty: "medium"
    },
    {
      question: "What is a subnet?",
      options: ["Subdivided part of network", "Small network", "Network partition", "Secondary network"],
      answer: "Subdivided part of network",
      difficulty: "medium"
    },
    {
      question: "What is ARP?",
      options: ["Protocol for mapping IP addresses to MAC addresses", "Address Resolution Protocol", "Network protocol", "Routing protocol"],
      answer: "Protocol for mapping IP addresses to MAC addresses",
      difficulty: "hard"
    },
    {
      question: "What is bandwidth?",
      options: ["Maximum data transfer rate of network", "Network width", "Data size", "Transfer speed"],
      answer: "Maximum data transfer rate of network",
      difficulty: "easy"
    },
    {
      question: "What is latency?",
      options: ["Time delay in data transmission", "Network delay", "Transfer time", "Connection delay"],
      answer: "Time delay in data transmission",
      difficulty: "easy"
    },
    {
      question: "What is the difference between router and switch?",
      options: ["Router connects networks, switch connects devices on same network", "Both do same thing", "Switch connects networks", "Router is local"],
      answer: "Router connects networks, switch connects devices on same network",
      difficulty: "medium"
    },
    {
      question: "What is a gateway?",
      options: ["Device providing access between networks with different protocols", "Network entrance", "Connection point", "Network border"],
      answer: "Device providing access between networks with different protocols",
      difficulty: "hard"
    },
    {
      question: "What is HTTPS?",
      options: ["HTTP with encryption for secure communication", "Hyper Text Protocol Secure", "Network protocol", "Secure web protocol"],
      answer: "HTTP with encryption for secure communication",
      difficulty: "medium"
    },
    {
      question: "What is SSL/TLS?",
      options: ["Protocols for secure encrypted communication", "Secure Socket Layer", "Network security", "Encryption protocol"],
      answer: "Protocols for secure encrypted communication",
      difficulty: "hard"
    },
    {
      question: "What is a VPN?",
      options: ["Virtual Private Network creating encrypted tunnel", "Virtual Private", "Network tunnel", "Private network"],
      answer: "Virtual Private Network creating encrypted tunnel",
      difficulty: "medium"
    },
    {
      question: "What is packet switching?",
      options: ["Data divided into packets and sent through different routes", "Switching packets", "Network switching", "Data switching"],
      answer: "Data divided into packets and sent through different routes",
      difficulty: "medium"
    },
    {
      question: "What is the purpose of port number?",
      options: ["To identify specific service on a device", "Network port", "Device connection", "Service identifier"],
      answer: "To identify specific service on a device",
      difficulty: "easy"
    },
    {
      question: "What is HTTP status code 404?",
      options: ["Not Found", "Error 404", "Server error", "Request error"],
      answer: "Not Found",
      difficulty: "easy"
    },
    {
      question: "What is the purpose of traceroute?",
      options: ["To trace path packets take to destination", "Routing tool", "Network trace", "Packet tracking"],
      answer: "To trace path packets take to destination",
      difficulty: "medium"
    },
    {
      question: "What is NAT?",
      options: ["Network Address Translation for IP address mapping", "Network Translation", "Address Translation", "Network Protocol"],
      answer: "Network Address Translation for IP address mapping",
      difficulty: "hard"
    }
  ]
};

export default technicalQuestionsData;
