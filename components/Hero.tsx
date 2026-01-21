'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useLanguage } from '@/lib/i18n'
import dynamic from 'next/dynamic'
import { BlurText } from '@/components/animations/BlurText'
import { ShinyText } from '@/components/animations/ShinyText'

const Particles = dynamic(
  () => import('@/components/animations/Particles').then(m => m.Particles),
  { ssr: false }
)

const PARTICLE_COLORS: string[] = ['#22d3ee', '#67e8f9', '#a5f3fc', '#0e7490']

export function Hero() {
  const { t } = useLanguage()
  const [animationStep, setAnimationStep] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className='min-h-[80vh] flex items-center py-24 relative overflow-hidden'>
      {/* Particles background */}
      <div className='absolute inset-0 -z-10'>
        <Particles
          key='particles-bg'
          particleCount={60}
          particleColors={PARTICLE_COLORS}
          speed={0.03}
          particleSize={2}
          moveParticlesOnHover
          alphaParticles
        />
      </div>

      <div className='max-w-5xl mx-auto px-6 w-full'>
        <div className='flex flex-col sm:flex-row gap-8 sm:gap-12 md:gap-16 items-center sm:justify-between'>
          <div className='space-y-6 flex-1 max-w-xl'>
            <div className='space-y-2'>
              {/* Greeting with shimmer effect */}
              <ShinyText
                text={t('hero.greeting')}
                speed={3}
                className='text-sm font-mono tracking-wider uppercase block'
              />

              {/* Name with blur entrance */}
              <h1>
                <BlurText
                  text='Rodrigo Eduardo'
                  delay={150}
                  animateBy='words'
                  className='text-5xl md:text-6xl font-bold tracking-tight'
                  onAnimationComplete={() => setAnimationStep(1)}
                />
              </h1>

              {/* Role with delayed blur entrance */}
              <div
                className={`transition-opacity duration-300 ${
                  animationStep >= 1 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <BlurText
                  text={t('hero.role')}
                  delay={100}
                  animateBy='words'
                  className='text-xl text-foreground/60 font-medium'
                  onAnimationComplete={() => setAnimationStep(2)}
                />
              </div>
            </div>

            {/* Description with subtle entrance */}
            <div
              className={`transition-opacity duration-300 ${
                animationStep >= 2 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <BlurText
                text={t('hero.description')}
                delay={30}
                animateBy='words'
                className='text-foreground/70 leading-relaxed text-lg'
                onAnimationComplete={() => setAnimationStep(3)}
              />
            </div>

            {/* CTA with fade-in after animations complete */}
            <div
              className={`flex gap-4 pt-4 transition-all duration-500 ${
                animationStep >= 3
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              <a
                href='#posts'
                className='inline-flex items-center gap-2 px-6 py-3 bg-highlight text-black font-medium rounded-full hover:bg-highlight/90 transition-all hover:scale-105'
              >
                {t('hero.cta')}
                <span aria-hidden='true'>↓</span>
              </a>
            </div>
          </div>

          {/* Profile image with scale entrance */}
          <div
            className={`relative w-48 h-48 sm:w-56 sm:h-56 shrink-0 transition-all duration-700 ${
              animationStep >= 1
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95'
            }`}
          >
            <div
              className={`absolute inset-0 bg-highlight/20 rounded-full transition-all duration-700 ease-out ${
                animationStep >= 1
                  ? `opacity-100 blur-3xl scale-125 ${prefersReducedMotion ? '' : 'animate-glow-pulse'}`
                  : 'opacity-0 blur-0 scale-90'
              }`}
            />
            <div className='relative w-full h-full rounded-full overflow-hidden border-2 border-foreground/10'>
              <Image
                src='https://github.com/rodrigoeduardo.png'
                alt='Rodrigo Eduardo'
                fill
                className='object-cover'
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
