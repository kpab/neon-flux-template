# 🎮 Neon Flux - Cyberpunk Next.js Template

<div align="center">

![Neon Flux Banner](https://via.placeholder.com/1200x400/0A0A0A/FF10F0?text=NEON+FLUX)

**A stunning cyberpunk-themed Next.js template with 3D graphics, neon effects, and interactive animations**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)
[![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](LICENSE)

[Documentation](#documentation) • [Features](#features) • [Quick Start](#quick-start)

</div>

---

## ✨ Features

### 🎨 Design System
- **Cyberpunk Aesthetic** - Neon colors, glitch effects, and futuristic UI
- **Custom Neon Utilities** - Pre-configured Tailwind CSS classes
- **Glassmorphism** - Modern glass effects with backdrop blur
- **Typography** - Orbitron, Space Mono, Rajdhani fonts

### 🎭 Animations
- **Canvas 3D Effects** - Custom canvas-based cyberpunk city
- **GSAP Support** - Advanced scroll-triggered animations
- **Framer Motion** - Smooth micro-interactions
- **Particle Effects** - Interactive background particles

### 🎬 Effects Library
- **Glitch Text** - Dynamic text distortion effects
- **RGB Split** - Chromatic aberration animations
- **Scan Lines** - Retro CRT monitor effect
- **Neon Glow** - Pulsing neon borders and shadows
- **Matrix Rain** - Falling code effect
- **Data Streams** - Binary data flow animations

### 🧩 Components
- **Hero Section** - Eye-catching landing with 3D background
- **Navigation** - Glassmorphic navbar with smooth transitions
- **Buttons** - Neon-styled interactive buttons
- **Cards** - Holographic card components
- **Grid Background** - Animated cyber grid

### 🎯 Performance
- **Optimized Rendering** - Efficient canvas-based effects
- **Code Splitting** - Dynamic imports for better loading
- **Responsive** - Mobile-first design
- **Reduced Motion** - Respects user preferences
- **TypeScript** - Full type safety

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

#### Using npx (Recommended)

```bash
npx create-neon-flux my-cyberpunk-app
cd my-cyberpunk-app
npm run dev
```

#### Using npm init

```bash
npm init @neon-flux/template my-cyberpunk-app
cd my-cyberpunk-app
npm run dev
```

#### Manual Clone

```bash
git clone https://github.com/kpab/neon-flux-template.git
cd neon-flux-template
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app! 🎉

---

## 📁 Project Structure

```
neon-flux-template/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles & CSS variables
│
├── components/
│   ├── 3d/
│   │   └── CyberCity.tsx   # Canvas-based 3D city scene
│   ├── animations/
│   │   ├── Hero.tsx        # Hero section
│   │   ├── GlitchText.tsx  # Glitch text effect
│   │   └── CyberGrid.tsx   # Animated grid background
│   ├── effects/
│   │   ├── ScanLines.tsx   # CRT scan line effect
│   │   └── Particles.tsx   # Particle background
│   ├── ui/
│   │   ├── CyberNav.tsx    # Navigation component
│   │   ├── NeonButton.tsx  # Neon-styled button
│   │   ├── HologramCard.tsx # Holographic card component
│   │   └── Terminal.tsx    # Terminal simulator
│   └── hooks/
│       ├── useGlitch.ts    # Glitch effect hook
│       ├── useNeonGlow.ts  # Neon glow hook
│       ├── useParallax.ts  # Parallax effect hook
│       └── useAudioReactive.ts  # Audio reactive hook
│
├── styles/
│   ├── neon.css            # Neon effect styles
│   ├── glitch.css          # Glitch animations
│   └── animations.css      # Custom animations
│
└── bin/
    └── create-app.js       # CLI tool
```

---

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to change neon colors:

```typescript
colors: {
  neon: {
    pink: "#FF10F0",    // Primary neon
    cyan: "#00FFF0",    // Secondary neon
    yellow: "#FFFF00",  // Accent
    purple: "#B026FF",
  },
  cyber: {
    black: "#0A0A0A",   // Background
    dark: "#0D0221",    // Dark elements
    grid: "#1A1A2E",    // Grid color
  },
}
```

### Configuration

Copy `.env.example` to `.env` and customize:

```bash
cp .env.example .env
```

```env
# Site Information
NEXT_PUBLIC_SITE_NAME="Neon Flux"
NEXT_PUBLIC_SITE_URL="https://your-site.vercel.app"
```

### Typography

Import custom fonts in `app/layout.tsx`:

```typescript
import { Orbitron, Space_Mono } from 'next/font/google';

const orbitron = Orbitron({ subsets: ['latin'] });
const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin']
});
```

---

## 🧩 Component Usage

### GlitchText

```tsx
import GlitchText from '@/components/animations/GlitchText';

<GlitchText
  text="CYBERPUNK 2077"
  className="text-6xl"
/>
```

### NeonButton

```tsx
import NeonButton from '@/components/ui/NeonButton';

<NeonButton variant="primary">
  Launch App
</NeonButton>
```

### CyberCity (3D Scene)

```tsx
import dynamic from 'next/dynamic';

const CyberCity = dynamic(() => import('@/components/3d/CyberCity'), {
  ssr: false,
});

<CyberCity />
```

### Custom Hooks

```tsx
import { useGlitch } from '@/components/hooks/useGlitch';
import { useNeonGlow } from '@/components/hooks/useNeonGlow';
import { useParallax } from '@/components/hooks/useParallax';

// Glitch effect
const isGlitching = useGlitch({ interval: 3000, duration: 300 });

// Neon glow effect
const { isGlowing, startGlow, stopGlow } = useNeonGlow();

// Parallax effect
const offset = useParallax(0.5);
```

---

## 🎯 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 📚 Documentation

### Design System

The template includes a comprehensive design system:

- **Colors**: Neon pink, cyan, yellow, purple + cyber blacks
- **Typography**: 4 cyberpunk-themed font families
- **Shadows**: Neon glow effects (sm, md, lg, xl)
- **Animations**: 12+ custom keyframe animations
- **Utilities**: Pre-configured Tailwind classes

### CSS Classes

#### Neon Effects
```css
.neon-text-pink      /* Pink neon text */
.neon-text-cyan      /* Cyan neon text */
.neon-border         /* Neon border effect */
.neon-button         /* Neon button style */
.neon-pulse          /* Pulsing glow animation */
```

#### Glitch Effects
```css
.glitch              /* Full glitch effect */
.rgb-split           /* RGB color separation */
.chromatic-aberration /* Chromatic aberration */
```

#### Animations
```css
.fade-in-up          /* Fade in from bottom */
.slide-in-left       /* Slide from left */
.float-animation     /* Floating effect */
.typewriter          /* Typing animation */
```

---

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kpab/neon-flux-template)

```bash
npm run build
vercel deploy
```

### Netlify

```bash
npm run build
netlify deploy --prod
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

---

## 🎮 Advanced Features

### Audio Reactive (Optional)

Enable audio-reactive animations:

```tsx
import { useAudioReactive } from '@/components/hooks/useAudioReactive';

const { volume, frequency } = useAudioReactive(true);
```

### GSAP ScrollTrigger

Add scroll-triggered animations:

```tsx
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

useEffect(() => {
  gsap.to('.element', {
    scrollTrigger: {
      trigger: '.element',
      start: 'top center',
    },
    opacity: 1,
    y: 0,
  });
}, []);
```

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md).

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Next.js** - The React Framework
- **GSAP** - Animation Platform
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation Library

---

## 📞 Support

- 🐛 Issues: [GitHub Issues](https://github.com/kpab/neon-flux-template/issues)

---

<div align="center">

**Built with ⚡ Neon Flux Template**

</div>
