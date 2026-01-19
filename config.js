// Tailwind CSS Configuration
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#2563eb", // Royal Blue (blue-600)
                "primary-hover": "#1d4ed8", // Blue 700
                "primary-glow": "#3b82f6", // Dodger Blue (blue-500)
                "accent": "#60a5fa", // Malibu (blue-400)
                "accent-glow": "#93c5fd", // Anakiwa (blue-300)
                "secondary": "#1e40af", // Persian Blue (blue-800)
                "background-light": "#ffffff",
                "background-dark": "#f8fafc", // Slate 50
                "surface-dark": "#ffffff",
                "surface-light": "#ffffff",
                "text-primary": "#111827", // Ebony (gray-900)
                "text-secondary": "#374151", // Oxford Blue (gray-700)
                "text-tertiary": "#4b5563", // River Bed (gray-600)
                "text-muted": "#64748b", // Slate Gray (gray-500)
                "text-light": "#9ca3af", // Gray Chateau (gray-400)
                "bg-gray": "#f9fafb", // Athens Gray
                "bg-blue-light": "#eff6ff", // Zumthor (blue-50)
                "bg-blue-lighter": "#deecfd",
                "bg-blue-lightest": "#e9effd",
                "bg-blue-pale": "#d0defa",
                "border-primary": "rgba(37, 99, 235, 0.2)", // Royal Blue 20%
                "border-light": "rgba(37, 99, 235, 0.15)", // Royal Blue 15%
                "border-lighter": "rgba(37, 99, 235, 0.1)", // Royal Blue 10%
            },
            fontFamily: {
                "display": ["Manrope", "sans-serif"],
                "body": ["Manrope", "sans-serif"],
            },
            fontSize: {
                'xs': '12px',
                'sm': '14px',
                'base': '16px',
                'lg': '18px',
                'xl': '20px',
                '2xl': '24px',
                '3xl': '36px',
                '4xl': '48px',
                '5xl': '95.6px',
            },
            spacing: {
                '320': '320px',
            },
            borderRadius: {
                'sm': '8px',
                'DEFAULT': '12px',
                'md': '16px',
                'lg': '24px',
                'full': '9999px',
            },
            backgroundImage: {
                'hero-gradient': 'linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(255,255,255,0.95) 50%, rgba(96,165,250,0.06) 100%)',
                'glass-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)',
                'button-gradient': 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                'text-gradient': 'linear-gradient(to right, #003 0%, #294975 100%)',
                'brand-gradient': 'linear-gradient(to right, #2563eb, #60a5fa)',
            },
            boxShadow: {
                'glow': '0 0 25px rgba(37, 99, 235, 0.3)',
                'glow-accent': '0 0 25px rgba(96, 165, 250, 0.2)',
                'glass': '0 4px 6px -1px rgba(37, 99, 235, 0.1), 0 2px 4px -1px rgba(37, 99, 235, 0.05)',
                'neon': '0 0 10px rgba(37, 99, 235, 0.3)',
            }
        },
    },
};
