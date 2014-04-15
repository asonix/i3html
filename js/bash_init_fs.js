//REQUIRED
none = "";
var fs = new FileSystem();
makeDirectory([["home"]],"folder",fs.currentdir,none);
makeDirectory([["usr"]],"folder",fs.currentdir,none);
makeDirectory([["usr","bin"]],"folder",fs.currentdir,none);

fs.userdir = search(preparePath("/home"),"","folder",fs.currentdir,none);

//OPTIONAL
makeDirectory([["usr","share"]],"folder",fs.currentdir,none);
makeDirectory([["etc"]],"folder",fs.currentdir,none);
makeDirectory([["etc","grub"]],"folder",fs.currentdir,none);
makeDirectory([["boot"]],"folder",fs.currentdir,none);
makeDirectory([["boot","EFI"]],"folder",fs.currentdir,none);
makeDirectory([["boot","EFI","efi"]],"folder",fs.currentdir,none);
makeDirectory([["boot","EFI","efi","boot"]],"folder",fs.currentdir,none);
makeDirectory([["bin"]],"folder",fs.currentdir,none);
makeDirectory([["cdrom"]],"folder",fs.currentdir,none);
makeDirectory([["lib"]],"folder",fs.currentdir,none);
makeDirectory([["lost+found"]],"folder",fs.currentdir,none);
makeDirectory([["mnt"]],"folder",fs.currentdir,none);
makeDirectory([["proc"]],"folder",fs.currentdir,none);
makeDirectory([["run"]],"folder",fs.currentdir,none);
makeDirectory([["selinux"]],"folder",fs.currentdir,none);
makeDirectory([["sys"]],"folder",fs.currentdir,none);
makeDirectory([["dev"]],"folder",fs.currentdir,none);
makeDirectory([["lib64"]],"folder",fs.currentdir,none);
makeDirectory([["media"]],"folder",fs.currentdir,none);
makeDirectory([["opt"]],"folder",fs.currentdir,none);
makeDirectory([["root"]],"folder",fs.currentdir,none);
makeDirectory([["sbin"]],"folder",fs.currentdir,none);
makeDirectory([["srv"]],"folder",fs.currentdir,none);
makeDirectory([["tmp"]],"folder",fs.currentdir,none);
makeDirectory([["var"]],"folder",fs.currentdir,none);

makeDirectory([["home","riley"]],"folder",fs.currentdir,none);
makeDirectory([["home","riley","Documents"]],"folder",fs.currentdir,none);
makeDirectory([["home","riley","Downloads"]],"folder",fs.currentdir,none);
makeDirectory([["home","riley","Music"]],"folder",fs.currentdir,none);
makeDirectory([["home","riley","Pictures"]],"folder",fs.currentdir,none);
makeDirectory([["home","riley","Videos"]],"folder",fs.currentdir,none);
