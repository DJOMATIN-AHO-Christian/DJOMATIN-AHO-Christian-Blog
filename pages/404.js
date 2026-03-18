import Link from 'next/link';
import React from 'react';

const NotFound = () => (
    <div className="flex flex-col items-center justify-center min-vh-100 py-20">
        <div className="text-center">
            <h1 className="text-6xl font-bold text-notion-text mb-4">404</h1>
            <div className="w-16 h-1 bg-notion-blue mx-auto mb-6 rounded-full" />
            <h2 className="text-2xl font-semibold text-notion-text mb-2">Page introuvable</h2>
            <p className="text-notion-secondary mb-8 max-w-md mx-auto">
                {`Désolé, la page que vous recherchez n'existe pas ou a été déplacée.`}
            </p>
            <Link href="/">
                <span className="cursor-pointer bg-notion-blue text-white px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition-all shadow-sm">
                    {`Retour à l'accueil`}
                </span>
            </Link>
        </div>
    </div>
);

export default NotFound;
