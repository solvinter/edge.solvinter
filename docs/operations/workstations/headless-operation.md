
## Disable Suspend on Headless GPU Nodes

Headless compute nodes must not suspend automatically.

For node `250`, GNOME Display Manager caused the system to suspend while idle. The node is therefore configured to boot into multi-user mode instead of graphical mode.

```bash
sudo systemctl set-default multi-user.target
sudo systemctl disable --now gdm
sudo systemctl mask sleep.target suspend.target hibernate.target hybrid-sleep.target
sudo systemctl restart systemd-logind
