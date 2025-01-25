# only-allow3
pnpm's [Only Allow](https://github.com/pnpm/only-allow) 
with version constraints support 😺.

## ✨ Usage
Put a `preinstall` script in your `package.json`

For example:
```json
{
  "scripts": {
    "preinstall": "npx only-allow3 bun"
  }
}
```

### ⭐ Version Constraints
*❕ Use `bunx` instead of `npx` below cuz i hates npm💢 :(*

**🎉 SemVer Ranges are supported!**

🤔 Additionally,
you can add `@` after your favorite package manager, 
and specify the version constraints.

Like: 
```shell
$ only-allow3 bun@^1.1.45
```

**🟦 A few more examples:**

#### Force Bun ^1.1.45

```shell
$ bunx only-allow3 bun@^1.1.45 # Only Bun version matching ^1.1.45 will be allowed 
```

#### Force Yarn 4.x

```shell
$ bunx only-allow3 yarn@4 # Only Yarn matching v4.x will be allowed 
```

#### Force pnpm >= 9

```shell
$ bunx only-allow3 pnpm@>=9 # Only pnpm version greater or equal than 9 will be allowed 
```

