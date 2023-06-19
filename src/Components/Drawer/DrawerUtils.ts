export const upDateDrawerFront = (setstate : any) => {
    const drawerButton = document.getElementById("forward-drawer");
    if (drawerButton) {
        drawerButton.style.display = "none";
    }
    const drawerButton1 = document.getElementById("backward-drawer");
    if (drawerButton1) {
        drawerButton1.style.display = "none";
    }
    document.getElementById("drawer")?.classList.add("drawer-width")
    setTimeout(() => {
        setstate(2)
    }, 1000)
}

export const upDateDrawerBackTo0 = (setstate : any) => {
    const drawerButton = document.getElementById("forward-drawer");
    if (drawerButton) {
        drawerButton.style.display = "none";
    }
    const drawerButton1 = document.getElementById("backward-drawer");
    if (drawerButton1) {
        drawerButton1.style.display = "none";
    }
    document.getElementById("drawer")?.classList.add("hidden")
    document.getElementById("drawer")?.classList.add("drawer-width-0")
    setTimeout(() => {
        setstate(0)
    }, 1000)
}   