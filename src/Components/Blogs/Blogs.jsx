import React from 'react';

const Blogs = () => {
    return (
        <div className="p-6 my-4 bg-white rounded-lg shadow-lg blog-post">
            <h2 className="mb-4 text-2xl font-semibold">Understanding Access Tokens and Refresh Tokens</h2>

            <h3 className="mb-2 text-lg font-semibold">What is an access token and refresh token?</h3>
            <p className="mb-4 text-gray-700">
                An access token is a credential used by a client to access protected resources on a server. It's typically short-lived and grants limited permissions. Refresh tokens, on the other hand, are used to obtain a new access token without requiring the user to re-enter their credentials. They work together in a flow where the access token provides temporary access, and the refresh token helps maintain that access.
            </p>

            <h4 className="mb-2 text-lg font-semibold">Access Token:</h4>
            <p className="mb-4 text-gray-700">
                An access token is a string representing the authorization granted to the client. It is usually a JSON Web Token (JWT) and contains information about the user and their permissions.
            </p>

            <h4 className="mb-2 text-lg font-semibold">Refresh Token:</h4>
            <p className="mb-4 text-gray-700">
                A refresh token is a long-lived credential that is used to obtain a new access token when the current one expires. It helps to maintain the user's session without requiring them to log in again.
            </p>

            <h3 className="mb-2 text-lg font-semibold">Where to Store on the Client-side?</h3>
            <p className="mb-4 text-gray-700">
                Access tokens and refresh tokens should be stored securely on the client-side. Common storage options include HTTP-only cookies, local storage, and session storage. Each has its advantages and trade-offs.
            </p>

            <h4 className="mb-2 text-lg font-semibold">HTTP-only Cookies:</h4>
            <p className="mb-4 text-gray-700">
                Cookies are a secure way to store tokens. They are sent automatically with every HTTP request, making them suitable for access tokens. However, refresh tokens are typically stored in more secure locations.
            </p>

            <h4 className="mb-2 text-lg font-semibold">Local Storage and Session Storage:</h4>
            <p className="mb-4 text-gray-700">
                While local storage and session storage are convenient, they are less secure. Access tokens should be used with caution in these storage options due to the risk of cross-site scripting (XSS) attacks. Refresh tokens should never be stored here.
            </p>

            <h2 className="mb-4 text-2xl font-semibold">What is Express.js?</h2>
            <p className="mb-4 text-gray-700">
                Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It is a fast, unopinionated, and lightweight framework for building web servers and APIs.
            </p>

            <h2 className="mb-4 text-2xl font-semibold">What is Nest.js?</h2>
            <p className="text-gray-700">
                Nest.js is a progressive Node.js framework for building efficient, scalable, and maintainable server-side applications. It uses TypeScript and combines elements of OOP (Object-Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).
            </p>
        </div>
    );
};

export default Blogs;
