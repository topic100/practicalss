Nice — I’ll walk you through **each practical (A–D)** with exact commands, code and line-by-line explanations, using the repo and identity you provided. I’ll assume you’re on a Unix-like shell (Git Bash / WSL / Linux / macOS). If you’re on Windows Command Prompt, most `git` and `docker` commands are identical but paths/quotes may differ.

> Repo: `https://github.com/topic100/DSA`
> Username: `topic100`
> Email: `topicstoo13@gmail.com`

---

# SECTION A — GIT PRACTICALS

## 1 — Implement GitHub Operations using Git — Making Changes and Creating a Branch

### Goal

Make a change to the repository, create a branch, commit the change locally.

### Steps & commands (copy-paste)

```bash
# 1.1 Configure git (run once)
git config --global user.name "topic100"
git config --global user.email "topicstoo13@gmail.com"

# 1.2 Clone the repo (if not already cloned)
git clone https://github.com/topic100/DSA.git
cd DSA

# 1.3 Create a new branch for your change
git checkout -b feature/add-readme-note

# 1.4 Make a simple change: add or update README
echo "This change added by topic100 on $(date)" >> README.md

# 1.5 Stage the change
git add README.md

# 1.6 Commit the change with a meaningful message
git commit -m "chore: add note to README (exercise)"

# 1.7 Check branch & commit history
git status
git log --oneline --decorate --graph -n 5
```

### Explanation (line-by-line)

* `git config --global user.name ...` and `git config --global user.email ...` — set identity for commits. Use your provided username/email.
* `git clone ...` — copies the remote repository to your machine.
* `cd DSA` — move into the project folder.
* `git checkout -b feature/...` — create and switch to a new branch named `feature/add-readme-note`.
* `echo ... >> README.md` — appends a line to `README.md` (demonstration change).
* `git add README.md` — stage the file so Git will include it in the next commit.
* `git commit -m "..."` — create a commit with a message describing the change.
* `git status` — shows working directory status.
* `git log --oneline --decorate --graph -n 5` — shows recent commits in a compact, visual way.

---

## 2 — Implement GitHub Operations using Git — Push/Pull Changes to GitHub

### Goal

Push your branch to GitHub and pull remote changes.

### Steps & commands

```bash
# 2.1 Ensure you are on your feature branch
git checkout feature/add-readme-note

# 2.2 Push the branch to GitHub (origin)
git push -u origin feature/add-readme-note

# 2.3 Create a Pull Request on GitHub:
# (Do this in the web UI: Github repo -> "Compare & pull request" -> open PR)
# OR (if using hub/gh CLI) you can run (optional):
# gh auth login               # if not logged in, then:
# gh repo clone topic100/DSA
# gh pr create --title "Add README note" --body "Adding a note as a practical exercise." --base main

# 2.4 Pull latest changes from main (safest to do on main)
git checkout main
git pull origin main

# 2.5 Merge remote main into your branch locally (to resolve conflicts early)
git checkout feature/add-readme-note
git merge main
# If conflicts occur, edit files, then:
git add <conflicted-files>
git commit -m "fix: merge conflicts resolved"
```

### Explanation

* `git push -u origin <branch>` — uploads your branch to remote `origin` and sets upstream so future `git push`/`git pull` default to it.
* Creating PR: usually done in GitHub web UI; CLI tools like `gh` can create PRs from terminal.
* `git pull origin main` — fetches and integrates remote `main`.
* `git merge main` into your feature branch keeps branch up-to-date and reduces PR conflicts.

---

## 3 — Implement GitHub Operations using Git — Cloning a Repository

### Goal

Clone repo, show alternate clone methods (HTTPS & SSH).

### Steps & commands

```bash
# HTTPS clone (simple)
git clone https://github.com/topic100/DSA.git

# OR SSH clone (if you have SSH keys added to GitHub)
git clone git@github.com:topic100/DSA.git

# After cloning, inspect remotes
cd DSA
git remote -v
```

### Explanation

* HTTPS clone uses username/password (or token) for push; easiest for beginners.
* SSH clone uses keys: you must add your public key to GitHub Settings → SSH and GPG keys.
* `git remote -v` shows where push/fetch go.

---

## 4 — Exploring Git Commands through Collaborative Coding — Creating and Committing Changes

### Goal

Add a new file, stage selectively, amend commit, and show how to view diffs.

### Steps & commands

```bash
# 4.1 Create a new file (example)
cat > exercises/notes.md <<'EOF'
# Practical notes
- Created by topic100
EOF

# 4.2 See the status & diff
git status
git diff -- exercises/notes.md

# 4.3 Stage the file
git add exercises/notes.md

# 4.4 Commit
git commit -m "feat: add practical notes"

# 4.5 If you want to change the commit message (before pushing)
git commit --amend -m "feat: add practical notes (improved message)"

# 4.6 To undo last local commit but keep changes staged:
git reset --soft HEAD~1

# 4.7 To discard uncommitted local changes (be careful):
git restore exercises/notes.md
```

### Explanation

* `cat > file <<'EOF' ...` — creates a file with contents.
* `git diff` shows unstaged changes; `git diff --staged` shows staged changes.
* `git commit --amend` rewrites the last commit (useful to fix message or add files before pushing).
* `git reset --soft HEAD~1` removes last commit but leaves changes staged — safe if you want to rework commit.
* `git restore` discards local uncommitted edits.

---

## 5 — Exploring Git Commands through Collaborative Coding — Branching and Merging

### Goal

Create multiple branches, merge via fast-forward and via merge commit, demonstrate resolving a conflict.

### Steps & commands

```bash
# 5.1 Create two branches
git checkout -b feature/a
# change file A
echo "Feature A" >> features.txt
git add features.txt
git commit -m "feat: add Feature A"

git checkout main
git checkout -b feature/b
# change file B
echo "Feature B" >> features.txt
git add features.txt
git commit -m "feat: add Feature B"

# 5.2 Merge feature/a into main (fast-forward or merge)
git checkout main
git merge feature/a    # if main has not advanced, this may fast-forward

# 5.3 Merge feature/b into main — possible conflict
git merge feature/b
# If conflict occurs, git will show conflict markers in files:
# <<<<<<< HEAD
# (main content)
# =======
# (feature/b content)
# >>>>>>> feature/b
# Resolve by editing the file to desired final content, then:
git add features.txt
git commit -m "fix: resolved merge conflict between feature/b and main"
```

### Explanation

* Multiple branches let team members work in parallel.
* Merge strategy:

  * Fast-forward: main moves pointer if no divergent commits.
  * Merge commit: records a commit combining histories.
* Conflicts occur when both branches change the same lines — resolve manually, then `git add` and `git commit`.

---

## 6 — Exploring Git Commands through Collaborative Coding — Setting Up Git Repository

### Goal

Initialize a new repo locally, create `.gitignore`, set hooks basics, and push to GitHub.

### Steps & commands

```bash
# 6.1 Initialize repository
mkdir my-new-project
cd my-new-project
git init

# 6.2 Create .gitignore
cat > .gitignore <<'EOF'
node_modules/
.env
.DS_Store
dist/
EOF

# 6.3 Create initial files and commit
echo "# My New Project" > README.md
git add README.md .gitignore
git commit -m "chore: initial commit with README and .gitignore"

# 6.4 Create remote repo on GitHub (manually via web UI or via gh CLI)
# Example if using gh (GitHub CLI):
# gh repo create topic100/my-new-project --public --source=. --remote=origin --push

# 6.5 Push to remote
git remote add origin https://github.com/topic100/my-new-project.git
git branch -M main
git push -u origin main
```

### Explanation

* `git init` creates `.git` metadata and starts the repository.
* `.gitignore` prevents committing build artifacts or secrets.
* `gh repo create` is optional and requires GitHub CLI; otherwise create repo in GitHub web UI and add `origin`.

---

# SECTION B — GITHUB / GITLAB

## 7 — Demonstrate how to create a GitHub account

### Steps (manual web UI)

1. Open `https://github.com`.
2. Click **Sign up**.
3. Enter your email (use `topicstoo13@gmail.com`), choose a username (e.g., `topic100`), and create a password.
4. Complete verification (email & captcha).
5. Choose free plan, skip/choose preferences, then verify email link from inbox.
6. Set up SSH keys (optional but recommended):

   * Generate key: `ssh-keygen -t ed25519 -C "topicstoo13@gmail.com"`
   * Copy public key: `cat ~/.ssh/id_ed25519.pub`
   * Paste into GitHub Settings → SSH and GPG keys → New SSH key.

### Explanation

* Email & username form your account identity.
* SSH keys allow secure push/pull without typing credentials.

---

## 8 — Create a merge request on GitLab and review the merge request

### Steps (GitLab flow; GitLab = remote on gitlab.com or self-hosted)

> Note: Merge Requests (MRs) in GitLab are equivalent to Pull Requests in GitHub.

1. **Create a GitLab account** at `https://gitlab.com` (if needed).
2. **Create/import repo** on GitLab (mirror or new).
3. **Push a branch** to GitLab:

```bash
# Add GitLab remote (example)
git remote add gitlab git@gitlab.com:topic100/DSA.git
git push -u gitlab feature/add-readme-note
```

4. **Open Merge Request (MR)**:

   * GitLab: Repository → Merge Requests → New merge request.
   * Select source branch `feature/add-readme-note` and target `main`.
   * Add title, description, assign reviewer(s), set labels/milestones.

5. **Review MR**:

   * Reviewer goes to the MR page, inspects diffs, uses inline comments.
   * Leave review comments on lines needing change.
   * Author updates code locally, pushes to same branch; MR updates automatically.

6. **Approve & Merge**:

   * Once approvals are met, click **Merge** (choose merge method: merge commit, fast-forward, or squash).
   * Optionally delete source branch after merge.

### Explanation

* MR workflow fosters code review, CI checks, and discussion before merging.
* Using `git push` to the gitlab remote triggers MR updates automatically.

---

# SECTION C — DOCKER & DOCKERFILE

## 9 — Create an account on Docker step-by-step

### Steps (web UI)

1. Visit `https://hub.docker.com`.
2. Click **Sign Up**.
3. Enter username (choose `topic100` if available), the email `topicstoo13@gmail.com`, and a strong password.
4. Verify your email via the email link.
5. (Optional) Install Docker Desktop for your OS from `https://www.docker.com/get-started`.
6. Log in on CLI: `docker login` and enter credentials (email/username + password, or use token).

### Explanation

* Docker Hub account lets you push/pull images to Docker Hub repositories.

---

## 10 — To study Dockerfile instructions, build an image for a sample web application using Dockerfile

Here is your **correct, clean, step-by-step rewritten guide** for creating and running a Dockerized web application using **Dockerfile + Nginx**.

---

# ✅ **STEP–BY–STEP DOCKER WEB APP PRACTICAL (Rewrite + Clean Instructions)**

## **1. Create a project folder**

Run these commands in **Command Prompt**:

```cmd
C:\Users\IMRDCOPM112> mkdir docker-webapp4
C:\Users\IMRDCOPM112> cd docker-webapp4
```

---

## **2. Create `index.html` file**

Run:

```cmd
C:\Users\IMRDCOPM112\docker-webapp4> notepad index.html
```

Paste the HTML:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My First Docker Web App</title>
</head>
<body>
    <h1><b>Happy Diwali</b></h1>
</body>
</html>
```

Save and close.

---

## **3. Enable file extensions in Windows (Important Step)**

Go to:

```
This PC → C: Drive → Users → IMRD → docker-webapp4
```

Then:

```
View → checkmark "File name extensions"
```

Now make sure your file names are:

✔ `index.html`
✔ `Dockerfile` (NO extension, NOT Dockerfile.txt)

If Dockerfile has an extension, rename it:

```
Right-click → Rename → remove .txt
```

---

## **4. Create Dockerfile**

Run in Command Prompt:

```cmd
C:\Users\IMRDCOPM112\docker-webapp4> notepad Dockerfile
```

Paste this Dockerfile:

```dockerfile
FROM nginx
COPY index.html /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Save and close.

---

## **5. Build the Docker Image**

Run:

```cmd
C:\Users\IMRDCOPM112\docker-webapp4> docker build -t mywebapp4 .
```

✔ This creates an image named **mywebapp4**
✔ The `.` means "build using current folder"

---

## **6. Run Container from the Image**

```cmd
C:\Users\IMRDCOPM112\docker-webapp4> docker run -d -p 8080:80 mywebapp4
```

Explanation:

* `-d` → run in background
* `-p 8080:80` → map host port 8080 → container port 80
* `mywebapp4` → image name

---

## **7. Open in Browser**

Open Chrome and visit:

```
http://localhost:8080
```

🎉 You will see **Happy Diwali** served from your NGINX Docker container.

---

# ✅ Your Complete Docker Practical Is Perfectly Ready!

If you want, I can also give you:

✔ A diagram of how Docker + Nginx works
✔ Commands for stopping/removing containers
✔ How to push this to Docker Hub
✔ How to make advanced Docker builds

Just tell me!


---

# SECTION D — VERSION CONTROL TOOLS

## 11 — Demonstrate a practical on Version Control Tools

### Goal

Overview & quick practicals using several common tools: Git CLI, GitHub Web UI, GitHub Desktop, GitLab Web UI, and a short intro to CI integration (GitHub Actions).

### Tasks & commands

#### A. Git CLI (we covered in Section A-C). Practical recap:

* Clone, branch, commit, push, pull, merge, rebase basics. (See previous commands.)

#### B. GitHub Desktop (GUI)

1. Download & install GitHub Desktop: `https://desktop.github.com`.
2. File → Clone repository → choose `URL` and paste `https://github.com/topic100/DSA.git`.
3. Create branch from the UI, make changes in your editor, return to GitHub Desktop → commit → push → create PR on GitHub.

#### C. SourceTree / GitKraken (optional)

* Similar flow: clone repo, create branch, stage/commit visually, push.

#### D. Basic GitHub Actions (CI) — add a simple workflow to run `npm test` (if project has tests) or lint

**File: `.github/workflows/node-ci.yml`**

```yaml
name: Node CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
```

**Explanation**

* `on` triggers workflow on push/PR to main.
* `actions/checkout` checks out repo.
* `actions/setup-node` installs Node.js.
* `npm ci` installs dependencies in CI.
* `npm test` runs test script — if none exists, replace with `echo "no tests"` or a linter step.

#### E. Using GitLab CI (brief)

* Create a `.gitlab-ci.yml` in repo root:

```yaml
stages:
  - test

test_job:
  stage: test
  image: node:18
  script:
    - npm ci
    - npm test
```

* Push to GitLab; pipelines run automatically.

---

# Extra tips, safety & best practices

* **Use meaningful commit messages**: `<type>(scope): short summary` e.g., `feat(auth): add JWT refresh token`.
* **Branching model**: feature branches named `feature/xyz`, bugfixes `fix/xyz`, hotfixes `hotfix/xyz`.
* **Never commit secrets**: add secrets like API keys to `.env` and ensure `.gitignore` contains `.env`.
* **Use PR templates & review templates** to standardize code reviews.
* **Protect main branch** on GitHub/GitLab: require PR review and CI green before merge.
* **Use `git rebase` carefully** — avoid rebasing public branches that others use.

---

# Quick checklist you can copy-run now

```bash
# Clone
git clone https://github.com/topic100/DSA.git
cd DSA

# Setup identity (if not set)
git config user.name "topic100"
git config user.email "topicstoo13@gmail.com"

# New branch and change
git checkout -b feature/demo-practical
echo "demo by topic100 $(date)" >> DEMO.md
git add DEMO.md
git commit -m "chore: add demo file for practical"
git push -u origin feature/demo-practical
```

---

If you want, I can:

* Generate the exact `index.html`, `Dockerfile`, and Node app files and upload them into a new branch in your repo (I can provide the complete file contents here for you to paste).
* Or produce a **one-click checklist** (copy-paste script) that runs many of the above steps for you locally (shell script).
  Tell me which of the above two you prefer and I’ll prepare it immediately.
