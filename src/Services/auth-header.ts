export default function authHeader() {
    const user = localStorage.getItem('user') || null;
    if(user) {
        return { Authorization: 'Bearer ' + user};
    }
    return null;
}