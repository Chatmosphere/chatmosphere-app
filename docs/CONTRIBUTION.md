# 😻 Contribution Guidelines

  
## 📋 Content
- [**How Can I Contribute ?**](#How-Can-I-Contribute)
    - [How to Report Bugs](#🐞-How-to-Report-Bugs)
    - [How to suggest Ideas and new Feature](#💡-How-to-suggest-Ideas-and-new-Features)
    - [How to make a nice Pull Request](#🔃-How-to-make-a-nice-Pull-Request)
<!--
 **What should I know before hacking on**
    - **Architecture Decisions**
        - maybe we could have an architecture chart
        - how our store is set up
            - general idea how to add state to stores
    - **Packages we use**
        - provide link to Styled Components
        - The Icon Font
- **Styleguides**
    - Use our Prettifier
        - provide config
    - How to name folders
    - Coding Style
        - camelCase,
        - Semicola can be omitted
        - Functional components over class components
        - Maybe Use our Linter
            - 
            - provide Linter
        - How we use theme variables
- Help Wanted / Ideas you could work on (maybe bring in good unit tests :)
-->
<br/>
      
## How Can I Contribute ?
### 🐞 How to Report Bugs 
___

A bug is a _demonstrable problem_ that is caused by the code in the repository.
Good bug reports are extremely helpful - thank you!

Guidelines for bug reports:

1. ☝️ **Use the [GitHub issue search](https://github.com/Chatmosphere/chatmosphere-app/issues?q=is%3Aissue+is%3Aopen+label%3Abug)** &mdash; check if the issue has already been
   reported.

2. ✌️ **Check if the issue has been fixed** &mdash; try to reproduce it using the
   latest `master` or development branch in the repository.

3. 🖖 **Isolate the problem** &mdash; create a [reduced test
   case](http://css-tricks.com/reduced-test-cases/) and a live example.

A good bug report shouldn't leave others needing to chase you up for more
information. Please try to be as detailed as possible in your report. What is
your environment? What steps will reproduce the issue? What browser(s) and OS
experience the problem? What would you expect to be the outcome? All these
details will help people to fix any potential bugs.

**Example:**

> Short and descriptive example bug report title
>
> A summary of the issue and the browser/OS environment in which it occurs. If
> suitable, include the steps required to reproduce the bug.
>
> 1. This is the first step
> 2. This is the second step
> 3. Further steps, etc.
>
> `<url>` - a link to the reduced test case
>
> Any other information you want to share that is relevant to the issue being
> reported. This might include the lines of code that you have identified as
> causing the bug, and potential solutions (and your opinions on their
> merits).

Finally, don't forget to add the `bug` label to your issue.

### 💡 How to suggest Ideas and new Features
___

Before creating enhancement suggestions or feature requests, please check [this list](#before-submitting-an-enhancement-suggestion) as you might find out that you don't need to create one. 
When you are creating an enhancement suggestion 
* Please include as many details as possible.
* Use [this issue](https://github.com/Chatmosphere/chatmosphere-app/issues/11) as inspiration
* Include the steps that you imagine you would take if the feature you're requesting existed.
* See the [avaliable labels](https://github.com/Chatmosphere/chatmosphere-app/labels) and add the ones that apply. For instance, add the label `enhancement` to your issue and `design` label if it's a design issue

#### Before Submitting New Feature Request

* **Perform a [cursory search](https://github.com/Chatmosphere/chatmosphere-app/issues)** to see if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.
* **Check the [change log](https://github.com/Chatmosphere/chatmosphere-app/blob/master/CHANGELOG.md) and [closed issues](https://github.com/Chatmosphere/chatmosphere-app/issues?q=is%3Aissue+is%3Aclosed)** — you might discover that the enhancement is already available. 
* Check if you're using the **latest version of Chatmosphere**
* Check if you can get the desired behavior by **changing** [connection options](https://github.com/Chatmosphere/chatmosphere-app/blob/master/src/serverConfig-example.ts) and [jitsi options](https://github.com/Chatmosphere/chatmosphere-app/blob/master/src/components/JitsiConnection/jitsiOptions.tsx).

### 🔃 How to make a nice Pull Request
___

Pull requests are the best way to propose changes to the codebase (we use [Github Flow](https://guides.github.com/introduction/flow/index.html)). We actively welcome your pull requests:

1. Fork the repo and create your branch from `master`.
2. In your commits, refer to the issue you are solving with this branch ([create an issue](#💡-How-to-suggest-Ideas-and-new-Features) if there isn't one)
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Make sure your code lints.
5. Issue that pull request and ask for review!