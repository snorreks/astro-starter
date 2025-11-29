# flake.nix
{
  description = "Next-Gen Playwright Development Environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    # This specific flake is great for fixing Playwright binaries on NixOS
    playwright.url = "github:pietdevries94/playwright-web-flake";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
    playwright,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        # 1. We create a strict overlay to ensure specific versions
        overlay = final: prev: {
          inherit (playwright.packages.${system}) playwright-test playwright-driver;
        };

        pkgs = import nixpkgs {
          inherit system;
          overlays = [overlay];
          config.allowUnfree = true; # Often needed for certain browser drivers
        };

        # 2. Define our Node version centrally so we can swap it easily
        nodeVersion = pkgs.nodejs_24;
      in {
        devShells.default = pkgs.mkShell {
          # 3. The "Hermetic" Package List
          # We include EVERYTHING needed to work on the repo.
          packages = [
            # Core Runtime
            nodeVersion
            pkgs.pnpm

            # Tools
            pkgs.git # Ensure git is available for lefthook
            pkgs.lefthook # Next Gen hooks

            # Playwright (Patched for NixOS)
            pkgs.playwright-test
          ];

          # 4. Environment Configuration
          shellHook = ''
            # Force pnpm to use the Node version defined in this shell, not global
            export npm_config_prefix="$PWD/.npm-global"
            export PATH="$PWD/.npm-global/bin:$PATH"

            # Playwright Specifics for NixOS
            export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
            export PLAYWRIGHT_BROWSERS_PATH="${pkgs.playwright-driver.browsers}"

            echo "------------------------------------------------"
            echo "🧪 Next-Gen Playwright Environment Loaded"
            echo "------------------------------------------------"
            echo "Node: $(node --version)"
            echo "Pnpm: $(pnpm --version)"
            echo "Browsers: $PLAYWRIGHT_BROWSERS_PATH"
            echo "------------------------------------------------"

            # Optional: Install hooks automatically on shell entry
            # lefthook install
          '';
        };
      }
    );
}
