---
title: bash file pasting
date: 2016-08-31 23:06:30
tags:
- tech
- it
- cli
- bash
---
Wanted to build a template engine using bash, asked yourself: How to paste my fancy file using bash?
Here is the answer!

```bash
# With parameter expanding
cat <<EOF >> bash-paste_expanding
export ME=`whoami`
EOF
## Result: export ME=lony```

```bash
# Without parameter expanding (look at the ')
cat <<'EOF' >> bash-paste_not-expanding
export ME=`whoami`
EOF
## Result: export ME=`whoami````
