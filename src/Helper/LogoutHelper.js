const logout = () => {
    sessionStorage.clear();
    localStorage.removeItem("is_active");
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("is_register");
    localStorage.removeItem("user_email");
    window.location.href = "/";
};

const LogoutHelper = {
    logout,
};

export default LogoutHelper;
