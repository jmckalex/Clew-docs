# A neutral prompt for shots/shell-panel.js, loaded with ZDOTDIR=shots/zsh —
# never the owner's own dotfiles in a published screenshot. The folder name
# on its own line, `$ ` below it, the time on the right.
PROMPT=$'%F{green}%1~/%f\n$ '
RPS1=$'%F{cyan}%*%f'
# /etc/zshrc points HISTFILE into ZDOTDIR — this repository. Keep none.
unset HISTFILE
