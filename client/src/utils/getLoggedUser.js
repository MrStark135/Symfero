export default function getLoggedUser() {
    if (!sessionStorage.getItem('session'))
    {
        throw new Error('No user logged in, or sessionStorage not working');
        return;
    }

    return {
        name: sessionStorage.getItem('name'),
        email: sessionStorage.getItem('email'),
        session: sessionStorage.getItem('session')
    }
}