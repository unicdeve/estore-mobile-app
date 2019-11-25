export const buildCustomerInfo = (info, provider) => {
    let user = {
        email: '',
        firstName: '',
        lastName: '',
        avatarUrl: '',
        provider: {
            uid: '',
            type: ''
        }
    }

    if (provider === "GOOGLE") {
        user.provider.uid = info.id;
        user.provider.type = provider;
        user.firstName = info.given_name;
        user.lastName = info.family_name;
        user.email = info.email;
        user.avatarUrl = info.picture;
    } else if (provider === "FACEBOOK") {
        const [firstName, ...lastName] = info.name.split(' ');
        user.firstName = firstName;
        user.lastName = lastName.join(" ");

        user.provider.uid = info.id;
        user.provider.type = provider;
        user.email = info.email;
        user.avatarUrl = info.picture.data.url;
    }

    return user;
}