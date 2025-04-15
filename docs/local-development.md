# Local Development

[Yalc](https://github.com/wclr/yalc) is the recommended way to test local changes in your project.
It provides better dependency management and more reliable linking than npm link.

First, install yalc globally if you haven't already:

```bash
npm install -g yalc
```

Then, in your DIVE project directory:

```bash
# Publish the package to yalc's local store
yalc publish

# In your project that uses DIVE:
yalc add @shopware-ag/dive
```

When you make changes to DIVE, you'll need to:

```bash
# In DIVE directory:
yalc push

# Or if you want to republish:
yalc publish --force
```

To remove the local package from your project:

```bash
yalc remove @shopware-ag/dive
```

Benefits of using yalc:

- Better dependency management
- More reliable than npm link
- Works well with package managers (npm, yarn, pnpm)
- Maintains proper package.json dependencies
- Supports multiple projects using the same local package
