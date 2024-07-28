# Contributing to Wuwa Abby

Thank you for considering contributing to Wuwa Abby! Your help is greatly appreciated. To ensure a smooth process, please follow the guidelines below.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Code of Conduct](#code-of-conduct)
3. [How to Contribute](#how-to-contribute)
    - [Types of Contributions](#types-of-contributions)
    - [Contribution Workflow](#contribution-workflow)
    - [Pull Requests](#pull-requests)
4. [Setting Up the Development Environment](#setting-up-the-development-environment)
    - [Dependencies](#dependencies)
    - [Build and Test](#build-and-test)
5. [Coding Standards](#coding-standards)
    - [Style Guides](#style-guides)
    - [Documentation Standards](#documentation-standards)
6. [Issues and Bug Reporting](#issues-and-bug-reporting)
7. [Communication](#communication)
8. [Legal](#legal)
9. [Recognition](#recognition)
10. [Additional Resources](#additional-resources)

## Project Overview

Wuwa Abby is a tracking tool for Wuthering Waves players, helping them manage their wishes (convenes), track pity, history, see stats, and create multiple profiles for multiple accounts.

This project uses the Angular Framework and ExpressJS to host the website. We also use [PrimeNG](https://primeng.org/) for the UI components. All resource links are provided below in the [Additional Resources](#additional-resources) section.

## Code of Conduct (TODO)

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

### Types of Contributions

We welcome various types of contributions, including but not limited to:
- Bug fixes
- New features
- Documentation improvements
- Testing and QA

### Contribution Workflow

1. **Fork the Repository**: Click the 'Fork' button on the top right to create a copy of the repository on your GitHub account.
2. **Clone the Fork**: Clone your fork to your local machine using:
    ```sh
    git clone https://github.com/zeroo28/wuwa-abby-site.git
    ```
3. **Create a Branch**: Create a new branch for your contribution:
    ```sh
    git checkout -b feature/your-feature-name
    ```
4. **Make Changes**: Make your changes in your local repository.
5. **Commit Changes**: Commit your changes with a meaningful commit message:
    ```sh
    git commit -m "Add new feature: your-feature-name"
    ```
6. **Push Changes**: Push your changes to your fork:
    ```sh
    git push origin feature/your-feature-name
    ```
7. **Submit a Pull Request**: Open a pull request from your fork's branch to the `main` branch of the original repository.

### Pull Requests

- **PR Template**: Please fill out the pull request template with all relevant information.
- **Review Process**: Your pull request will be reviewed by project maintainers. Feedback and requested changes will be communicated through the PR comments.

### Testing and QA
Drop me (Zeroo/MichMich) a message on my socials (Discord preffered choice) or create a [Discussions](https://github.com/Zeroo28/wuwa-abby-site/discussions) post to learn more.

## Setting Up the Development Environment

### Dependencies

Ensure you have the following installed:
- Node.js (version `20 lts` or higher - recommended to use the latest LTS (Long-term-support verion))
- npm (version `10 lts` or higher - recommended to use the latest LTS (Long-term-support verion))

### Build and Test

To build and run the project, run:
```sh
npm install # this won't be required every time
npm start
```
These commands while start a local express.js server and host the project on `http://localhost:4200/`. Additionally, you might need to change the `port` if you have other applications/projects using the same localhost port (recommended since Wuwa Abby might clear the localStorage and/or cookies)

**Note**: I've skipped on testing in this project to reduce the time required to develop new features and maintain the project, but feel free to create an issue if you have any ideas to integrate testing.

## Coding Standards

### Style Guides

The project has recommended extensions setup for everyone using VS code. These recommendations include;
- Angular Service
- Prettier
- Spell Check

If you are using any other IDE/code editor, please make sure to check out for typos and code formatting.

### Documentation Standards

If you think your contributed code might be difficult to read or is complicated, please make sure to add comments to help out others when they're reading your code. Code comments are greately appreciated.

## Issues and Bug Reporting
- Use the provided issue templates for bug reports and feature requests.
- Label issues appropriately to help organize and prioritize them.

If you create an issue with the provided templates you won't have to worry about picking the right labels as they are already configured.

## Communication

- **Community Channels**: Create a new post in the [Discussions](https://github.com/Zeroo28/wuwa-abby-site/discussions) to share your ideas and discuss with other contributors and users.

## Legal
By contributing, you agree that your contributions will be licensed under the same license as the project. See the [LICENSE](LICENSE) file for more information.

Recognition
We appreciate your contributions! Contributors will be recognized in the project's release notes and on a contributors list.

## Additional Resources
- [GitHub Documentation](https://docs.github.com/)
- [Open Source Guides](https://opensource.guide/)
- [Angular 18 docs](https://angular.dev/)
- [Angular SSR docs](https://angular.dev/guide/ssr) (Server-Side rendering)
- [PrimeNG docs](https://primeng.org/menu) (UI component library)
