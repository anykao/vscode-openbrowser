in setting.json

```json
{
    "before": ["g", "x"],
    "after": [],
    "commands": [
        {
            "command": "extension.openBrowser",
            "args": []
        }
    ]
},
{
    "before": ["g", "y"],
    "after": [],
    "commands": [
        {
            "command": "extension.yewSyntax",
            "args": []
        }
    ]
}
```

**Q: Where are extensions installed?**

**A**: Extensions are installed in a per user extensions folder. Depending on your platform, the location is in the following folder:

- **Windows** `%USERPROFILE%\.vscode\extensions`
- **macOS** `~/.vscode/extensions`
- **Linux** `~/.vscode/extensions`

You can change the location by launching VS Code with the `--extensions-dir <dir>` command line [option](/docs/editor/command-line.md).
