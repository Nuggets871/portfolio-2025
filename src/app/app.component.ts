import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  image: string;
  url?: string;
  repo?: string;
  skills: string[];
  competenceLevels: Record<string, number>; // 0-100
}

interface TechItem { name: string; icon: string; img?: string; }
interface TechCategory { name: string; icon: string; items: TechItem[]; }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-base-200">
      <!-- Navbar -->
      <div class="navbar sticky top-0 z-50 bg-base-100/80 backdrop-blur border-b border-base-300">
        <div class="flex-1">
          <a href="#home" class="btn btn-ghost text-xl">Portfolio</a>
        </div>
        <div class="flex-none gap-2">
          <!-- Desktop anchors -->
          <ul class="menu menu-horizontal px-1 hidden lg:flex">
            <li><a href="#technologies">Technologies</a></li>
            <li><a href="#projects">Projets</a></li>
            <li><a href="#competences">Compétences BUT</a></li>
            <li><a href="#formation">Formation</a></li>
            <li><a href="#experience">Parcours</a></li>
            <li><a href="#interets">Centres d'intérêt</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>

          <!-- Theme select -->
          <select class="select select-sm select-bordered" [value]="currentTheme" (change)="changeTheme($event)">
            <option *ngFor="let t of themes" [value]="t">{{t}}</option>
          </select>

          <a class="btn btn-primary btn-sm" href="assets/cv.pdf" download>CV</a>

          <!-- Mobile menu -->
          <div class="dropdown dropdown-end lg:hidden">
            <div tabindex="0" role="button" class="btn btn-ghost">Menu</div>
            <ul tabindex="0" class="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              <li><a href="#technologies">Technologies</a></li>
              <li><a href="#projects">Projets</a></li>
              <li><a href="#competences">Compétences BUT</a></li>
              <li><a href="#formation">Formation</a></li>
              <li><a href="#experience">Parcours</a></li>
              <li><a href="#interets">Centres d'intérêt</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Hero -->
      <section id="home" class="hero min-h-screen scroll-mt-24 relative overflow-hidden">
        <!-- Decorative GSAP blobs -->
        <div class="pointer-events-none absolute inset-0 -z-10">
          <div class="blob blob-1 absolute w-80 h-80 bg-gradient-to-br from-primary/30 to-secondary/30 blur-3xl rounded-full -top-16 -left-10"></div>
          <div class="blob blob-2 absolute w-96 h-96 bg-gradient-to-br from-accent/30 to-secondary/20 blur-3xl rounded-full -bottom-24 -right-16"></div>
        </div>
        <div class="hero-content flex-col lg:flex-row-reverse gap-8 container mx-auto px-4">
          <img src="https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=800&auto=format&fit=crop" alt="profile" class="hero-img max-w-sm rounded-2xl shadow-2xl gsap-reveal" />
          <div>
            <h1 class="hero-title text-5xl md:text-6xl font-black leading-tight">Christopher <span class="text-primary">Bondier</span></h1>
            <p class="hero-sub py-6 text-lg opacity-80 max-w-prose">
              Alternant en développement full-stack. Actuellement en troisième année de BUT Informatique à l'IUT Lyon 1 (La Doua).
            </p>
            <div class="flex flex-wrap gap-3">
              <a class="btn btn-secondary hero-cta magnetic" href="#projects">Voir mes projets</a>
              <a class="btn btn-outline hero-cta magnetic" href="assets/cv.pdf" download>Télécharger mon CV</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Technologies -->
      <section id="technologies" class="container mx-auto px-4 py-16 scroll-mt-24">
        <h2 class="text-3xl md:text-4xl font-bold mb-6 gsap-reveal">Technologies</h2>
        <p class="opacity-70 mb-6 gsap-reveal">Un aperçu structuré de mes technologies par catégorie.</p>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div *ngFor="let cat of techCategories; trackBy: trackByCategory" class="card bg-base-100 shadow gsap-card">
            <div class="card-body">
              <div class="flex items-center gap-3 mb-2">
                <div class="text-2xl">{{cat.icon}}</div>
                <h3 class="card-title text-xl">{{cat.name}}</h3>
              </div>
              <div class="flex flex-wrap gap-2">
                <span *ngFor="let t of cat.items; trackBy: trackByTech" class="badge badge-lg badge-outline gsap-chip flex items-center gap-1">
                  <img *ngIf="t.img" [src]="t.img" [alt]="t.name + ' logo'" class="w-5 h-5" loading="lazy" referrerpolicy="no-referrer" />
                  <span *ngIf="!t.img" class="text-base">{{t.icon}}</span>
                  <span>{{t.name}}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects -->
      <section id="projects" class="container mx-auto px-4 py-16 scroll-mt-24">
        <div class="flex items-end justify-between mb-6">
          <h2 class="text-3xl md:text-4xl font-bold gsap-reveal">Projets</h2>
          <a href="#contact" class="link link-primary">Me contacter</a>
        </div>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div *ngFor="let p of projects; trackBy: trackByTitle" class="card bg-base-100 shadow-xl gsap-card">
            <figure><img [src]="p.image" [alt]="p.title" class="h-48 w-full object-cover" /></figure>
            <div class="card-body">
              <h3 class="card-title">{{p.title}}</h3>
              <p class="opacity-80">{{p.description}}</p>
              <div class="flex flex-wrap gap-2 mt-2">
                <span *ngFor="let tag of p.skills" class="badge badge-outline">{{tag}}</span>
              </div>
              <div class="card-actions justify-end mt-4">
                <button class="btn btn-primary btn-sm" (click)="openProject(p)">Plus d'infos</button>
                <a *ngIf="p.url" class="btn btn-ghost btn-sm" [href]="p.url" target="_blank" rel="noopener">Demo</a>
                <a *ngIf="p.repo" class="btn btn-ghost btn-sm" [href]="p.repo" target="_blank" rel="noopener">Code</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Project Modal -->
        <dialog #projectModal class="modal">
          <div class="modal-box max-w-3xl">
            <h3 class="font-bold text-lg">{{selectedProject?.title}}</h3>
            <p class="py-2 opacity-80">{{selectedProject?.description}}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span *ngFor="let tag of selectedProject?.skills ?? []" class="badge badge-outline">{{tag}}</span>
            </div>
            <div>
              <h4 class="font-semibold mb-2">Les 6 compétences du BUT Informatique</h4>
              <div class="space-y-3 max-h-[40vh] overflow-auto pr-2">
                <div *ngFor="let c of butCompetences; trackBy: trackByName">
                  <div class="flex items-center justify-between">
                    <span class="text-sm">{{c}}</span>
                    <div class="flex items-center gap-2">
                      <span class="badge badge-outline">{{ levelLabel(valueForCompetence(c)) }}</span>
                      <span class="text-xs opacity-70">{{ levelStars(valueForCompetence(c)) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-action">
              <form method="dialog">
                <button class="btn">Fermer</button>
              </form>
            </div>
          </div>
          <form method="dialog" class="modal-backdrop"><button>close</button></form>
        </dialog>
      </section>

      <!-- Competences BUT (overview) -->
      <section id="competences" class="container mx-auto px-4 py-16 scroll-mt-24">
        <h2 class="text-3xl md:text-4xl font-bold mb-6 gsap-reveal">Compétences BUT Informatique</h2>
        <div class="grid gap-6 md:grid-cols-2">
          <div *ngFor="let c of butCompetences; trackBy: trackByName" class="card bg-base-100 shadow gsap-card">
            <div class="card-body">
              <div class="flex items-center justify-between">
                <h3 class="card-title text-base">{{c}}</h3>
                <span class="badge">Niveau d'expertise</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="badge badge-outline">{{ levelLabel(competenceOverview[c]) }}</span>
                <span class="text-sm opacity-70">{{ levelStars(competenceOverview[c]) }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Formation -->
      <section id="formation" class="container mx-auto px-4 py-16 scroll-mt-24">
        <h2 class="text-3xl md:text-4xl font-bold mb-6 gsap-reveal">Formation</h2>
        <ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
          <li *ngFor="let f of formations; let i = index; trackBy: trackByTitle">
            <div class="timeline-middle">🎓</div>
            <div [class]="'timeline-' + (i % 2 === 0 ? 'start md:text-end' : 'end')">
              <time class="font-mono italic">{{f.period}}</time>
              <div class="text-lg font-bold">{{f.title}}</div>
              <div class="opacity-80">{{f.org}}</div>
              <div class="opacity-70">{{f.desc}}</div>
            </div>
            <hr />
          </li>
        </ul>
      </section>

      <!-- Experience -->
      <section id="experience" class="container mx-auto px-4 py-16 scroll-mt-24">
        <h2 class="text-3xl md:text-4xl font-bold mb-6 gsap-reveal">Parcours professionnel</h2>
        <ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
          <li *ngFor="let e of experiences; let i = index; trackBy: trackByTitle">
            <div class="timeline-middle">⚡</div>
            <div [class]="'timeline-' + (i % 2 === 0 ? 'start md:text-end' : 'end')">
              <time class="font-mono italic">{{e.period}}</time>
              <div class="text-lg font-bold">{{e.title}} — {{e.org}}</div>
              <div class="opacity-80">{{e.desc}}</div>
            </div>
            <hr />
          </li>
        </ul>
      </section>

      <!-- Interests -->
      <section id="interets" class="container mx-auto px-4 py-16 scroll-mt-24">
        <h2 class="text-3xl md:text-4xl font-bold mb-6 gsap-reveal">Centres d'intérêt</h2>
        <div class="flex flex-wrap gap-3">
          <div *ngFor="let i of interets; trackBy: trackByName" class="badge badge-lg gsap-chip">{{i}}</div>
        </div>
      </section>

      <!-- Contact -->
      <footer id="contact" class="bg-base-100 border-t border-base-300">
        <div class="container mx-auto px-4 py-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">Contact</h2>
          <div class="grid gap-6 md:grid-cols-2">
            <div class="card bg-base-200">
              <div class="card-body">
                <h3 class="card-title">Coordonnées</h3>
                <ul class="space-y-2">
                  <li>📧 Email: <a class="link link-primary" href="mailto:christopherbondier@gmail.com">christopherbondier&#64;gmail.com</a></li>
                  <li>📱 Téléphone: <a class="link" href="tel:+33615925832">06 15 92 58 32</a></li>
                  <li>🌐 Site: <a class="link" href="https://christopher-bondier.fr" target="_blank" rel="noopener">christopher-bondier.fr</a></li>
                  <li>📍 Localisations: Villeurbanne (69100) — Lyon, Oyonnax</li>
                  <li>🗓️ Né le 11/10/2004</li>
                </ul>
              </div>
            </div>
            <div class="card bg-base-200">
              <div class="card-body">
                <h3 class="card-title">Réseaux</h3>
                <div class="flex flex-wrap gap-3">
                  <a class="btn btn-outline btn-sm" href="https://www.linkedin.com" target="_blank" rel="noopener">LinkedIn</a>
                  <a class="btn btn-outline btn-sm" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
                  <a class="btn btn-outline btn-sm" href="#home">Retour en haut</a>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center opacity-70 mt-8">© 2025 Christopher Bondier — Tous droits réservés.</div>
        </div>
      </footer>
    </div>
  `,
})
export class AppComponent implements AfterViewInit {
  @ViewChild('projectModal') projectModal!: ElementRef<HTMLDialogElement>;

  themes: string[] = ['cupcake','emerald','dracula','lofi','forest'];
  currentTheme = 'cupcake';

  skills = [
    // Programmation
    'Python','Java','C','Spring Boot',
    // Web
    'HTML','CSS','JavaScript','Angular','ReactJS','VueJS','PHP','Symfony',
    // Bases de données
    'SQL','PL/SQL','MongoDB',
    // Outils & Data
    'Git','Power BI',
    // Logiciels
    'VS Code','Android Studio','Code::Blocks','VMware','PowerAMC','Suite Office',
    // Systèmes & Gestion de projet
    'Windows','Linux','SCRUM',
    // Langues
    'Français (natif)','Anglais (B2)'
  ];

  techCategories: TechCategory[] = [
    {
      name: 'Dév Web',
      icon: '🌐',
      items: [
        { name: 'HTML', icon: '🔶', img: 'https://cdn.simpleicons.org/html5/E34F26' },
        { name: 'CSS', icon: '🎨', img: 'https://cdn.simpleicons.org/css3/1572B6' },
        { name: 'JavaScript', icon: '⚡', img: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
        { name: 'Angular', icon: '🅰️', img: 'https://cdn.simpleicons.org/angular/DD0031' },
        { name: 'ReactJS', icon: '⚛️', img: 'https://cdn.simpleicons.org/react/61DAFB' },
        { name: 'VueJS', icon: '🖖', img: 'https://cdn.simpleicons.org/vuedotjs/4FC08D' },
        { name: 'PHP', icon: '🐘', img: 'https://cdn.simpleicons.org/php/777BB4' },
        { name: 'Symfony', icon: '🎼', img: 'https://cdn.simpleicons.org/symfony/000000' },
      ],
    },
    {
      name: 'Dév logiciel',
      icon: '💻',
      items: [
        { name: 'Python', icon: '🐍', img: 'https://cdn.simpleicons.org/python/3776AB' },
        { name: 'Java', icon: '☕', img: 'https://cdn.simpleicons.org/java/ED8B00' },
        { name: 'C', icon: '🔧', img: 'https://cdn.simpleicons.org/c/00599C' },
        { name: 'Spring Boot', icon: '🍃', img: 'https://cdn.simpleicons.org/springboot/6DB33F' },
      ],
    },
    {
      name: 'Gestion de projet',
      icon: '📋',
      items: [
        { name: 'SCRUM', icon: '🧭' },
        { name: 'Git', icon: '🔀', img: 'https://cdn.simpleicons.org/git/F05032' },
      ],
    },
    {
      name: 'Bases de données',
      icon: '🗄️',
      items: [
        { name: 'SQL', icon: '🧮' },
        { name: 'PL/SQL', icon: '📜', img: 'https://cdn.simpleicons.org/oracle/F80000' },
        { name: 'MongoDB', icon: '🍃', img: 'https://cdn.simpleicons.org/mongodb/47A248' },
      ],
    },
    {
      name: 'Systèmes',
      icon: '🖥️',
      items: [
        { name: 'Windows', icon: '🪟', img: 'https://cdn.simpleicons.org/windows/0078D6' },
        { name: 'Linux', icon: '🐧', img: 'https://cdn.simpleicons.org/linux/FCC624' },
      ],
    },
    {
      name: 'Outils',
      icon: '🧰',
      items: [
        { name: 'VS Code', icon: '🧩', img: 'https://cdn.simpleicons.org/visualstudiocode/007ACC' },
        { name: 'Android Studio', icon: '🤖', img: 'https://cdn.simpleicons.org/androidstudio/3DDC84' },
        { name: 'Code::Blocks', icon: '📦' },
        { name: 'VMware', icon: '🖥️', img: 'https://cdn.simpleicons.org/vmware/607078' },
        { name: 'PowerAMC', icon: '📐' },
        { name: 'Suite Office', icon: '📄', img: 'https://cdn.simpleicons.org/microsoftoffice/EA3E23' },
        { name: 'Power BI', icon: '📊', img: 'https://cdn.simpleicons.org/powerbi/F2C811' },
      ],
    },
  ];

  readonly butCompetences = [
    'Réaliser un développement d’application',
    'Optimiser des applications',
    'Administrer des systèmes informatiques',
    'Gérer des données de l’information',
    'Conduire un projet',
    'Collaborer au sein d’une équipe',
  ];

  competenceOverview: Record<string, number> = {
    'Réaliser un développement d’application': 85,
    'Optimiser des applications': 70,
    'Administrer des systèmes informatiques': 60,
    'Gérer des données de l’information': 75,
    'Conduire un projet': 65,
    'Collaborer au sein d’une équipe': 80,
  };

  formations = [
    {
      period: 'Septembre 2022 — Juillet 2025',
      title: 'BUT Informatique (Diplôme en trois ans)',
      org: 'IUT Claude Bernard, Université Lyon 1 — Villeurbanne',
      desc: 'Troisième année en cours'
    },
    {
      period: 'Septembre 2019 — Juin 2022',
      title: 'Baccalauréat Général (Mention Bien)',
      org: 'Lycée Arbez Carme — Bellignat',
      desc: 'Options: Mathématiques, NSI'
    }
  ];

  projects: Project[] = [
    {
      title: 'ERP IUT — Gestion département (React/NextJS/Express)',
      description: "Création d'un ERP en groupe de 20 personnes pour le département informatique de l’IUT afin de simplifier la gestion des mails, emplois du temps, formations, stages, alternances, notes et absences.",
      image: 'https://images.unsplash.com/photo-1529101091764-c3526daf38fe?q=80&w=1200&auto=format&fit=crop',
      url: undefined,
      repo: undefined,
      skills: ['React','Next.js','Express','Node.js','ERP','Travail en équipe'],
      competenceLevels: {
        'Réaliser un développement d’application': 85,
        'Optimiser des applications': 65,
        'Administrer des systèmes informatiques': 55,
        'Gérer des données de l’information': 80,
        'Conduire un projet': 70,
        'Collaborer au sein d’une équipe': 90,
      },
    },
    {
      title: 'Eduquiz — Plateforme de flashcards (JS/PHP)',
      description: "Clone du site Quizlet : plateforme éducative en ligne pour créer, partager et étudier avec des flashcards interactives.",
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop',
      url: 'https://eduquiz.fun',
      repo: undefined,
      skills: ['JavaScript','PHP','Flashcards','Éducation','Web'],
      competenceLevels: {
        'Réaliser un développement d’application': 80,
        'Optimiser des applications': 60,
        'Administrer des systèmes informatiques': 40,
        'Gérer des données de l’information': 70,
        'Conduire un projet': 60,
        'Collaborer au sein d’une équipe': 75,
      },
    },
    {
      title: 'Itinéraires transport — Graphes (Java)',
      description: "Application d'aide décisionnelle de transport en utilisant des graphes pour calculer les itinéraires les plus courts.",
      image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1200&auto=format&fit=crop',
      url: undefined,
      repo: undefined,
      skills: ['Java','Graphes','Dijkstra','Algorithmes'],
      competenceLevels: {
        'Réaliser un développement d’application': 75,
        'Optimiser des applications': 65,
        'Administrer des systèmes informatiques': 35,
        'Gérer des données de l’information': 60,
        'Conduire un projet': 55,
        'Collaborer au sein d’une équipe': 70,
      },
    },
    {
      title: "Annuaire CSV (C)",
      description: "Élaboration d'un système de gestion d'annuaire enregistrant ses données dans un fichier CSV.",
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop',
      url: undefined,
      repo: undefined,
      skills: ['C','Fichiers','CSV'],
      competenceLevels: {
        'Réaliser un développement d’application': 65,
        'Optimiser des applications': 50,
        'Administrer des systèmes informatiques': 30,
        'Gérer des données de l’information': 55,
        'Conduire un projet': 45,
        'Collaborer au sein d’une équipe': 60,
      },
    },
    {
      title: 'Algorithmes de tri',
      description: 'Implémentation de tri à bulles, tri fusion, tri par insertion et tri par sélection.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
      url: undefined,
      repo: undefined,
      skills: ['Tri bulle','Tri fusion','Tri insertion','Tri sélection','Algorithmie'],
      competenceLevels: {
        'Réaliser un développement d’application': 60,
        'Optimiser des applications': 70,
        'Administrer des systèmes informatiques': 25,
        'Gérer des données de l’information': 40,
        'Conduire un projet': 40,
        'Collaborer au sein d’une équipe': 55,
      },
    },
    {
      title: 'Blog PHP avec base de données',
      description: "Création d'un blog avec base de donnée.",
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop',
      url: undefined,
      repo: undefined,
      skills: ['PHP','Base de données','CRUD','Web'],
      competenceLevels: {
        'Réaliser un développement d’application': 70,
        'Optimiser des applications': 50,
        'Administrer des systèmes informatiques': 35,
        'Gérer des données de l’information': 65,
        'Conduire un projet': 50,
        'Collaborer au sein d’une équipe': 60,
      },
    },
    {
      title: 'Power BI — Aide à la décision',
      description: "Création de visuels pour assister une entreprise dans la prise de décisions favorisant la génération de profits.",
      image: 'https://images.unsplash.com/photo-1551281044-8b89adc1cf5e?q=80&w=1200&auto=format&fit=crop',
      url: undefined,
      repo: undefined,
      skills: ['Power BI','DataViz','Décisionnel'],
      competenceLevels: {
        'Réaliser un développement d’application': 50,
        'Optimiser des applications': 45,
        'Administrer des systèmes informatiques': 30,
        'Gérer des données de l’information': 70,
        'Conduire un projet': 55,
        'Collaborer au sein d’une équipe': 65,
      },
    },
  ];

  experiences = [
    {
      period: "Août 2024 — Août 2025",
      title: "Alternance développeur full-stack",
      org: "UBIKAP — Villeurbanne",
      desc: "Angular / NodeJS · Maintenance de la solution existante."
    },
    {
      period: "Avril 2023 — Juillet 2023",
      title: "Stage développeur full-stack",
      org: "UBIKAP — Villeurbanne",
      desc: "Angular / NodeJS · Maintenance de la solution existante · Création d'une page permettant aux utilisateurs de suivre les consommations payantes effectuées sur notre solution."
    }
  ];

  interets = ['🎵 Musique', '🏃 Sport', '📸 Photo', '🧑‍🍳 Cuisine', '🧩 Jeux de logique', '✈️ Voyage'];

  selectedProject: Project | null = null;

  ngAfterViewInit(): void {
    // Theme initialization (persisted)
    let saved: string | null = null;
    try { saved = localStorage.getItem('theme'); } catch {}
    const initial = saved || document.documentElement.getAttribute('data-theme') || this.currentTheme;
    this.currentTheme = initial;
    this.applyTheme(initial);

    // Hero intro animations
    gsap.from('.hero-title', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' });
    gsap.from('.hero-sub', { y: 20, opacity: 0, duration: 0.8, delay: 0.15, ease: 'power3.out' });
    gsap.from('.hero-cta', { y: 10, opacity: 0, duration: 0.6, delay: 0.3, stagger: 0.1, ease: 'power3.out' });

    // Generic reveal on scroll
    gsap.utils.toArray<HTMLElement>('.gsap-reveal').forEach((el: HTMLElement) => {
      gsap.from(el, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
        },
      });
    });

    // Cards/Chips stagger reveal
    gsap.utils.toArray<HTMLElement>('.gsap-card, .gsap-chip').forEach((el: HTMLElement) => {
      gsap.from(el, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      });
    });

    // Subtle float for technology icons
    gsap.to('#technologies .gsap-chip img', {
      y: -3,
      repeat: -1,
      yoyo: true,
      duration: 2.2,
      ease: 'sine.inOut',
      stagger: { each: 0.06, from: 'random' },
      scrollTrigger: { trigger: '#technologies', start: 'top 85%' }
    });

    // Floating gradient blobs in hero
    gsap.to('.blob-1', { x: 30, y: -20, duration: 8, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    gsap.to('.blob-2', { x: -25, y: 30, duration: 9, yoyo: true, repeat: -1, ease: 'sine.inOut' });

    // Parallax effect on hero image while scrolling
    gsap.to('.hero-img', {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: true }
    });

    // Magnetic buttons
    document.querySelectorAll('.magnetic').forEach((btn) => {
      const el = btn as HTMLElement;
      const move = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        gsap.to(el, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: 'power3.out' });
      };
      const reset = () => gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: 'power3.out' });
      el.addEventListener('mousemove', move);
      el.addEventListener('mouseleave', reset);
    });

  }

  changeTheme(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.currentTheme = value;
    this.applyTheme(value);
  }

  private applyTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch {}
  }

  openProject(p: Project) {
    this.selectedProject = p;
    if (this.projectModal?.nativeElement) {
      this.projectModal.nativeElement.showModal();
    }
  }

  valueForCompetence(c: string): number {
    const project = this.selectedProject;
    if (!project) return 0;
    const levels = project.competenceLevels ?? {};
    const v = levels[c];
    return typeof v === 'number' && isFinite(v) ? v : 0;
  }

  levelFromValue(v: number): number {
    if (!(typeof v === 'number' && isFinite(v))) return 0;
    if (v <= 0) return 0;
    if (v <= 20) return 1;
    if (v <= 40) return 2;
    if (v <= 60) return 3;
    if (v <= 80) return 4;
    return 5;
  }

  levelLabel(v: number): string {
    const lvl = this.levelFromValue(v);
    switch (lvl) {
      case 0: return "À définir";
      case 1: return "Débutant";
      case 2: return "Intermédiaire -";
      case 3: return "Intermédiaire";
      case 4: return "Avancé";
      case 5: return "Expert";
      default: return "À définir";
    }
  }

  levelStars(v: number): string {
    const lvl = this.levelFromValue(v);
    const full = "★".repeat(Math.max(0, Math.min(5, lvl)));
    const empty = "☆".repeat(5 - Math.max(0, Math.min(5, lvl)));
    return full + empty;
  }

  trackByCategory = (_: number, cat: TechCategory) => cat.name;
  trackByTech = (_: number, t: TechItem) => t.name;
  trackByName = (_: number, item: any) => (item && (item.name ?? item));
  trackByTitle = (_: number, item: any) => item.title ?? item;
}
