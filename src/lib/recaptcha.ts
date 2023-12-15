const checkRecaptchaToken = async (token: string): Promise<boolean> => {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHAV2_SECRET_KEY}&response=${token}`;
    const response = await fetch(url, { method: 'POST' });
    const data = await response.json();
    return data.success;
}

export default checkRecaptchaToken;