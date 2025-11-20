# Task Tracker Solution Overview

## Debugging

### Issue

When I hooked up the angular SPA to the Web API, when performing CRUD operations there would be duplicate
http calls being made.

### Diagnosis

I paid attention to the network tab of the Chrome Developer Tools to preserve the logs and calls being made
so that I can better see where and when does the duplicate call happen.

### Resolution

Browse the web to see if the problem was common amongst other developers using sources like StackOverflow.
I realized that due to the form component that I am using in both the create & edit page which was subcribed to the event passed through but also having named the input property "submit".

## Version Control

With regards to version control, I opted for using commit identifiers like "feature" and "chore" to better
identify what I did. I also ensured to stick to making micro-commits as much as possible once I had reached a milestone.
Due to the nature of the project and being the only one working on it, I did not see the need to have different branches but if the needed arose I would then ensure to have a better strategy.

-   Create a new branch from MAIN
-   prefix it with the action being taken (`feature/` | `bugfix/` | `chore/`)
-   work on the branch and commit to it
-   create a pull request to the MAIN branch
-   complete and delete working branch

## Design Decision

As the project is small in size I opted for a simple architecture where the Web Api is a simple monolith whilst keeping princples like Single Responsibility to keep the code clean.

The tradeoffs were primarily in the web api as using design architecture like Clean Architecture or Vertical Slice would be overkill in a small sized project.
