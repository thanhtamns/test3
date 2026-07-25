# Snapshot file
# Unset all aliases to avoid conflicts with functions
unalias -a 2>/dev/null || true
shopt -s expand_aliases
# Check for rg availability
if ! (unalias rg 2>/dev/null; command -v rg) >/dev/null 2>&1; then
  function rg {
  local _cc_bin="${CLAUDE_CODE_EXECPATH:-}"
  [[ -x $_cc_bin ]] || _cc_bin=/c/Users/phamt/.local/bin/claude.exe
  if [[ ! -x $_cc_bin ]]; then command rg "$@"; return; fi
  if [[ -n $ZSH_VERSION ]]; then
    ARGV0=rg "$_cc_bin" "$@"
  elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "win32" ]]; then
    ARGV0=rg "$_cc_bin" "$@"
  elif [[ $BASHPID != $$ ]]; then
    exec -a rg "$_cc_bin" "$@"
  else
    (exec -a rg "$_cc_bin" "$@")
  fi
}
fi
export PATH='/c/Users/phamt/bin:/mingw64/bin:/usr/local/bin:/usr/bin:/bin:/mingw64/bin:/usr/bin:/c/Users/phamt/bin:/c/Program Files/ImageMagick-7.1.2-Q16-HDRI:/c/WINDOWS/system32:/c/WINDOWS:/c/WINDOWS/System32/Wbem:/c/WINDOWS/System32/WindowsPowerShell/v1.0:/c/WINDOWS/System32/OpenSSH:/c/Program Files/nodejs:/cmd:/c/Program Files/GitHub CLI:/c/Program Files/Docker/Docker/resources/bin:/c/Program Files/Go/bin:/c/Users/phamt/.cargo/bin:/c/Users/phamt/AppData/Local/Programs/Python/Python314/Scripts:/c/Users/phamt/AppData/Local/Programs/Python/Python314:/c/Users/phamt/AppData/Local/Microsoft/WindowsApps:/c/Users/phamt/AppData/Local/Programs/Microsoft VS Code/bin:/c/Users/phamt/AppData/Roaming/npm:/c/Users/phamt/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.0.1-full_build/bin:/c/Users/phamt/AppData/Local/Programs/Ollama:/d/code/invesments/local-llm/scripts:/c/Users/phamt/go/bin:/usr/bin/vendor_perl:/usr/bin/core_perl'
