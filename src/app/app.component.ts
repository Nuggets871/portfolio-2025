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
          <!-- Global decorative layers -->
          <div class="site-decor pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
              <div class="stars-layer"></div>
              <div class="constellations-layer"></div>
          </div>
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

                  <!-- Theme family + day/night -->
                  <div class="flex items-center gap-2">
                      <select class="select select-sm select-bordered" [value]="currentFamily"
                              (change)="changeTheme($event)">
                          <option *ngFor="let t of themeFamilies" [value]="t">{{ t }}</option>
                      </select>
                      <button class="btn btn-ghost btn-sm" (click)="toggleDarkMode()"
                              [attr.aria-label]="isDark ? 'Activer le mode jour' : 'Activer le mode nuit'">
                          <span *ngIf="!isDark">🌙</span>
                          <span *ngIf="isDark">☀️</span>
                      </button>
                  </div>

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
                  <img src="assets/img/profile.webp" alt="profile"
                       class="hero-img max-w-sm rounded-2xl shadow-2xl gsap-reveal"/>
                  <div>
                      <h1 class="hero-title text-5xl md:text-6xl font-black leading-tight">Christopher <span
                              class="text-primary">Bondier</span></h1>
                      <p class="hero-sub py-6 text-lg opacity-80 max-w-prose">
                          Alternant en développement full-stack. Actuellement en troisième année de BUT Informatique à
                          l'IUT Lyon 1 (La Doua).
                      </p>
                      <div class="flex flex-wrap gap-3">
                          <a class="btn btn-secondary hero-cta magnetic" href="#projects">Voir mes projets</a>
                          <a class="btn btn-outline hero-cta magnetic" href="assets/cv.pdf" download>Télécharger mon
                              CV</a>
                      </div>
                  </div>
              </div>
          </section>

          <!-- Technologies -->
          <section id="technologies" class="container mx-auto px-4 py-16 scroll-mt-24">
              <h2 class="text-3xl md:text-4xl font-bold mb-6">Technologies</h2>
              <p class="opacity-70 mb-6">Un aperçu structuré de mes technologies par catégorie.</p>
              <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div *ngFor="let cat of techCategories; trackBy: trackByCategory" class="card bg-base-100 shadow">
                      <div class="card-body">
                          <div class="flex items-center gap-3 mb-2">
                              <div class="text-2xl">{{ cat.icon }}</div>
                              <h3 class="card-title text-xl">{{ cat.name }}</h3>
                          </div>
                          <div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                              <div *ngFor="let t of cat.items; trackBy: trackByTech"
                                   class="rounded-xl border border-base-300/60 bg-base-100/40 backdrop-blur p-3 text-center">
                                  <img *ngIf="t.img" [src]="t.img" [alt]="t.name + ' logo'"
                                       class="w-10 h-10 mx-auto mb-2" loading="lazy" referrerpolicy="no-referrer"/>
                                  <div *ngIf="!t.img" class="text-3xl mb-2">{{ t.icon }}</div>
                                  <div class="text-xs opacity-80">{{ t.name }}</div>
                              </div>
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
                      <figure><img [src]="p.image" [alt]="p.title" class="h-48 w-full object-cover"/></figure>
                      <div class="card-body">
                          <h3 class="card-title">{{ p.title }}</h3>
                          <p class="opacity-80">{{ p.description }}</p>
                          <div class="flex flex-wrap gap-2 mt-2">
                              <span *ngFor="let tag of p.skills" class="badge badge-outline">{{ tag }}</span>
                          </div>
                          <div class="card-actions justify-end mt-4">
                              <button class="btn btn-primary btn-sm" (click)="openProject(p)">Plus d'infos</button>
                              <a *ngIf="p.url" class="btn btn-ghost btn-sm" [href]="p.url" target="_blank"
                                 rel="noopener">Demo</a>
                              <a *ngIf="p.repo" class="btn btn-ghost btn-sm" [href]="p.repo" target="_blank"
                                 rel="noopener">Code</a>
                          </div>
                      </div>
                  </div>
              </div>

              <!-- Project Modal -->
              <dialog #projectModal class="modal">
                  <div class="modal-box max-w-3xl">
                      <h3 class="font-bold text-lg">{{ selectedProject?.title }}</h3>
                      <p class="py-2 opacity-80">{{ selectedProject?.description }}</p>
                      <div class="flex flex-wrap gap-2 mb-4">
                          <span *ngFor="let tag of selectedProject?.skills ?? []"
                                class="badge badge-outline">{{ tag }}</span>
                      </div>
                      <div>
                          <h4 class="font-semibold mb-2">Compétences entraînées par ce projet</h4>
                          <div class="flex flex-wrap gap-2">
                              <span *ngFor="let item of projectTrainedCompetences(); trackBy: trackByKey" class="badge"
                                    [ngClass]="item.badgeClass">{{ item.key }}</span>
                          </div>
                      </div>
                      <div class="modal-action">
                          <form method="dialog">
                              <button class="btn">Fermer</button>
                          </form>
                      </div>
                  </div>
                  <form method="dialog" class="modal-backdrop">
                      <button>close</button>
                  </form>
              </dialog>
          </section>

          <!-- Compétences BUT (détails cliquables, code couleur) -->
          <section id="competences" class="container mx-auto px-4 py-16 scroll-mt-24">
              <h2 class="text-3xl md:text-4xl font-bold mb-6">Compétences BUT Informatique</h2>
              <div class="space-y-4">
                  <div *ngFor="let c of competencesData; trackBy: trackByKey"
                       class="collapse collapse-arrow bg-base-100 border border-base-300/60">
                      <input type="checkbox"/>
                      <div class="collapse-title flex items-center justify-between gap-4">
                          <div class="flex items-center gap-3">
                              <span class="inline-block w-2 h-6 rounded" [ngClass]="c.colorBar"></span>
                              <span class="font-medium">{{ c.key }}</span>
                          </div>
                          <span class="badge" [ngClass]="c.badgeClass">Niveau {{ c.level }}</span>
                      </div>
                      <div class="collapse-content">
                          <p class="opacity-80 mb-3">{{ c.justification }}</p>
                          <h4 class="font-semibold mb-1">Situations professionnelles</h4>
                          <ul class="list-disc ms-5 mb-3">
                              <li *ngFor="let s of c.situations">{{ s }}</li>
                          </ul>
                          <h4 class="font-semibold mb-1">Description</h4>
                          <p class="opacity-80">{{ c.description }}</p>
                      </div>
                  </div>
              </div>
          </section>

          <!-- Formation -->
          <section id="formation" class="container mx-auto px-4 py-16 scroll-mt-24">
              <h2 class="text-3xl md:text-4xl font-bold mb-6 gsap-reveal">Formation</h2>
              <ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                  <li *ngFor="let f of formations; let i = index; trackBy: trackByTitle">
                      <div class="timeline-middle">
                          <div class="avatar">
                              <div class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                                  <img [src]="f.img || 'https://images.unsplash.com/photo-1521310192545-4ac7951413f0?w=100&auto=format&fit=crop'"
                                       [alt]="f.org + ' logo'"/>
                              </div>
                          </div>
                      </div>
                      <div [class]="'timeline-' + (i % 2 === 0 ? 'start md:text-end' : 'end')">
                          <div class="card bg-base-100 shadow">
                              <div class="card-body">
                                  <time class="font-mono italic">{{ f.period }}</time>
                                  <div class="text-lg font-bold">{{ f.title }}</div>
                                  <div class="opacity-80">{{ f.org }}</div>
                                  <div class="opacity-70">{{ f.desc }}</div>
                                  <div class="mt-2 flex flex-wrap gap-2" *ngIf="f.tags?.length">
                                      <span class="badge badge-outline" *ngFor="let tag of f.tags">{{ tag }}</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <hr/>
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
                          <time class="font-mono italic">{{ e.period }}</time>
                          <div class="text-lg font-bold">{{ e.title }} — {{ e.org }}</div>
                          <div class="opacity-80">{{ e.desc }}</div>
                      </div>
                      <hr/>
                  </li>
              </ul>
          </section>

          <!-- Interests -->
          <section id="interets" class="container mx-auto px-4 py-16 scroll-mt-24">
              <h2 class="text-3xl md:text-4xl font-bold mb-6 gsap-reveal">Centres d'intérêt</h2>
              <div class="flex flex-wrap gap-3">
                  <div *ngFor="let i of interets; trackBy: trackByName" class="badge badge-lg gsap-chip">{{ i }}</div>
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
                                  <li>📧 Email: <a class="link link-primary" href="mailto:christopherbondier@gmail.com">christopherbondier&#64;gmail.com</a>
                                  </li>
                                  <li>📱 Téléphone: <a class="link" href="tel:+33615925832">06 15 92 58 32</a></li>
                                  <li>🌐 Site: <a class="link" href="https://christopher-bondier.fr" target="_blank"
                                                 rel="noopener">christopher-bondier.fr</a></li>
                                  <li>📍 Localisations: Villeurbanne (69100) — Lyon, Oyonnax</li>
                                  <li>🗓️ Né le 11/10/2004</li>
                              </ul>
                          </div>
                      </div>
                      <div class="card bg-base-200">
                          <div class="card-body">
                              <h3 class="card-title">Réseaux</h3>
                              <div class="flex flex-wrap gap-3">
                                  <a class="btn btn-outline btn-sm" href="https://www.linkedin.com" target="_blank"
                                     rel="noopener">LinkedIn</a>
                                  <a class="btn btn-outline btn-sm" href="https://github.com" target="_blank"
                                     rel="noopener">GitHub</a>
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

  // Theme pairing (day/night)
  themeFamilies: string[] = ['cupcake','emerald','lofi'];
  currentFamily: string = 'cupcake';
  isDark: boolean = false;
  themePairs: Record<string, { light: string; dark: string }> = {
    cupcake: { light: 'cupcake', dark: 'dracula' },
    emerald: { light: 'emerald', dark: 'forest' },
    lofi: { light: 'lofi', dark: 'black' },
  };

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
        { name: 'JavaScript', icon: '⚡', img: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
        { name: 'TypeScript', icon: '🧩', img: 'https://cdn.simpleicons.org/typescript/3178C6' },
        { name: 'Angular', icon: '🅰️', img: 'https://cdn.simpleicons.org/angular/DD0031' },
        { name: 'ReactJS', icon: '⚛️', img: 'https://cdn.simpleicons.org/react/61DAFB' },
        { name: 'VueJS', icon: '🖖', img: 'https://cdn.simpleicons.org/vuedotjs/4FC08D' },
        { name: 'Node.js', icon: '🟢', img: 'https://cdn.simpleicons.org/nodedotjs/339933' },
        { name: 'ExpressJS', icon: '🚏', img: 'https://cdn.simpleicons.org/express/000000' },
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
        { name: 'Oracle', icon: '📜', img: 'https://cdn.simpleicons.org/oracle/F80000' },
        { name: 'PostgreSQL', icon: '🐘', img: 'https://cdn.simpleicons.org/postgresql/4169E1' },
        { name: 'MySQL', icon: '🐬', img: 'https://cdn.simpleicons.org/mysql/4479A1' },
        { name: 'MongoDB', icon: '🍃', img: 'https://cdn.simpleicons.org/mongodb/47A248' },
        { name: 'Neo4j', icon: '🕸️', img: 'https://cdn.simpleicons.org/neo4j/008CC1' },
      ],
    },
    {
      name: 'Systèmes',
      icon: '🖥️',
      items: [
        { name: 'Windows', icon: '🪟', img: 'https://cdn.simpleicons.org/windows/0078D6' },
        { name: 'Linux', icon: '🐧', img: 'https://cdn.simpleicons.org/linux/FCC624' },
        { name: 'Docker', icon: '🐳', img: 'https://cdn.simpleicons.org/docker/2496ED' },
        { name: 'Kubernetes', icon: '☸️', img: 'https://cdn.simpleicons.org/kubernetes/326CE5' },
      ],
    },
    {
      name: 'Outils',
      icon: '🧰',
      items: [
        { name: 'VS Code', icon: '🧩', img: 'https://cdn.simpleicons.org/visualstudiocode/007ACC' },
        { name: 'Android Studio', icon: '🤖', img: 'https://cdn.simpleicons.org/androidstudio/3DDC84' },
        { name: 'JetBrains', icon: '💡', img: 'https://cdn.simpleicons.org/jetbrains/000000' },
        { name: 'Code::Blocks', icon: '📦' },
        { name: 'VMware', icon: '🖥️', img: 'https://cdn.simpleicons.org/vmware/607078' },
        { name: 'PowerAMC', icon: '📐' },
        { name: 'Suite Office', icon: '📄', img: 'https://cdn.simpleicons.org/microsoftoffice/EA3E23' },
        { name: 'Power BI', icon: '📊', img: 'https://cdn.simpleicons.org/powerbi/F2C811' },
      ],
    },
  ];

  readonly butCompetences = [
    'Réaliser',
    'Optimiser',
    'Administrer',
    'Gérer',
    'Conduire',
    'Collaborer',
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
      desc: 'Troisième année en cours',
      img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=128&auto=format&fit=crop',
      tags: ['BUT Informatique','IUT Lyon 1','Alternance']
    },
    {
      period: 'Septembre 2019 — Juin 2022',
      title: 'Baccalauréat Général (Mention Bien)',
      org: 'Lycée Arbez Carme — Bellignat',
      desc: 'Options: Mathématiques, NSI',
      img: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=128&auto=format&fit=crop',
      tags: ['Mention Bien','Mathématiques','NSI']
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

  // Compétences BUT (données + niveaux + couleurs)
  competencesData = [
    {
      key: 'Réaliser',
      colorBar: 'bg-red-500',
      badgeClass: 'badge-outline text-red-500 border-red-500',
      level: 3,
      situations: [
        "Élaborer une application informatique",
        "Faire évoluer une application informatique",
        "Maintenir en conditions opérationnelles une application informatique",
      ],
      description: "Concevoir, développer et maintenir des applications sur divers supports (web, mobile, embarqué, etc.) en appliquant les bonnes pratiques.",
      justification: "Niveau 3 acquis via la réalisation complète d'applications (ERP IUT, Eduquiz, blog PHP) avec intégration front/back, qualité de code et maintenance.",
    },
    {
      key: 'Optimiser',
      colorBar: 'bg-orange-500',
      badgeClass: 'badge-outline text-orange-500 border-orange-500',
      level: 3,
      situations: [
        "Améliorer les performances des programmes dans des contextes contraints",
        "Limiter l’impact environnemental d’une application informatique",
        "Mettre en place des applications informatiques adaptées et efficaces",
      ],
      description: "Analyser et optimiser les performances des applications et leurs empreintes (temps, mémoire, énergie).",
      justification: "Niveau 3 confirmé par l'optimisation d'algorithmes (graphes, tris) et d'applications web (requêtes, cache, assets).",
    },
    {
      key: 'Administrer',
      colorBar: 'bg-yellow-500',
      badgeClass: 'badge-outline text-yellow-600 border-yellow-500',
      level: 2,
      situations: [
        "Déployer une nouvelle architecture technique",
        "Améliorer une infrastructure existante",
        "Sécuriser les applications et les services",
      ],
      description: "Mettre en place, configurer et sécuriser des services/systèmes de base en environnement réseau.",
      justification: "Niveau 2 grâce à des déploiements et configurations simples (stages/alternance) et à la sécurisation basique des services.",
    },
    {
      key: 'Gérer',
      colorBar: 'bg-green-500',
      badgeClass: 'badge-outline text-green-600 border-green-500',
      level: 2,
      situations: [
        "Lancer un nouveau projet",
        "Sécuriser des données",
        "Exploiter des données pour la prise de décisions",
      ],
      description: "Concevoir, manipuler et protéger des données; analyser et restituer pour la décision (BI).",
      justification: "Niveau 2 attesté par la création de modèles de données (blog, ERP) et des tableaux de bord (Power BI).",
    },
    {
      key: 'Conduire',
      colorBar: 'bg-blue-700',
      badgeClass: 'badge-outline text-blue-700 border-blue-700',
      level: 2,
      situations: [
        "Lancer un nouveau projet",
        "Piloter le maintien d’un projet en condition opérationnelle",
        "Faire évoluer un système d’information",
      ],
      description: "Planifier, suivre et faire évoluer des projets informatiques à l'échelle équipe/produit.",
      justification: "Niveau 2 grâce au pilotage de lots (ERP à 20), suivi des tickets et amélioration continue en alternance.",
    },
    {
      key: 'Collaborer',
      colorBar: 'bg-black',
      badgeClass: 'badge-outline text-black border-black',
      level: 2,
      situations: [
        "Lancer un nouveau projet",
        "Organiser son travail en relation avec celui de son équipe",
        "Élaborer, gérer et transmettre de l’information",
      ],
      description: "Travailler efficacement en équipe (méthodes, outils, communication).",
      justification: "Niveau 2 validé par le travail d'équipe (SCRUM, Git) sur ERP/alternance et la communication régulière.",
    },
  ];

  // Mapping des libellés complets (projets) -> clés courtes
  competenceKeyMap: Record<string, string> = {
    'Réaliser un développement d’application': 'Réaliser',
    'Optimiser des applications': 'Optimiser',
    'Administrer des systèmes informatiques': 'Administrer',
    'Gérer des données de l’information': 'Gérer',
    'Conduire un projet': 'Conduire',
    'Collaborer au sein d’une équipe': 'Collaborer',
  };

  selectedProject: Project | null = null;

  ngAfterViewInit(): void {
    // Theme initialization (persisted)
    let savedFamily: string | null = null;
    let savedDark: string | null = null;
    try {
      savedFamily = localStorage.getItem('themeFamily');
      savedDark = localStorage.getItem('isDark');
    } catch {}

    if (savedFamily) {
      this.currentFamily = savedFamily;
      this.isDark = savedDark === '1';
    } else {
      const attr = document.documentElement.getAttribute('data-theme') || 'cupcake';
      // Try to resolve family/isDark from current data-theme
      let resolved = false;
      for (const fam of Object.keys(this.themePairs)) {
        const pair = this.themePairs[fam];
        if (attr === pair.dark) { this.currentFamily = fam; this.isDark = true; resolved = true; break; }
        if (attr === pair.light) { this.currentFamily = fam; this.isDark = false; resolved = true; break; }
      }
      if (!resolved) {
        this.currentFamily = 'cupcake';
        this.isDark = false;
      }
    }
    this.applyCurrentTheme();

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
    this.currentFamily = value;
    try { localStorage.setItem('themeFamily', this.currentFamily); } catch {}
    this.applyCurrentTheme();
  }

  toggleDarkMode() {
    this.isDark = !this.isDark;
    try { localStorage.setItem('isDark', this.isDark ? '1' : '0'); } catch {}
    this.applyCurrentTheme();
  }

  private getEffectiveTheme(): string {
    const pair = this.themePairs[this.currentFamily];
    if (pair) return this.isDark ? pair.dark : pair.light;
    return this.currentFamily;
  }

  private applyCurrentTheme() {
    const theme = this.getEffectiveTheme();
    this.applyTheme(theme);
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

  projectTrainedCompetences(): { key: string; badgeClass: string }[] {
    const p = this.selectedProject;
    if (!p || !p.competenceLevels) return [];
    const items = Object.entries(p.competenceLevels)
      .filter(([_, v]) => typeof v === 'number' && isFinite(v) && v > 0)
      .map(([longKey, v]) => ({ longKey, v }))
      .sort((a, b) => b.v - a.v)
      .map(({ longKey }) => {
        const key = this.competenceKeyMap[longKey] || longKey;
        const conf = this.competencesData.find(x => x.key === key);
        const badgeClass = conf?.badgeClass || 'badge-outline';
        return { key, badgeClass };
      });
    // dedupe by key while preserving order
    const seen = new Set<string>();
    const out: { key: string; badgeClass: string }[] = [];
    for (const it of items) {
      if (!seen.has(it.key)) { seen.add(it.key); out.push(it); }
    }
    return out;
  }

  trackByKey = (_: number, item: any) => item?.key ?? item;
  trackByCategory = (_: number, cat: TechCategory) => cat.name;
  trackByTech = (_: number, t: TechItem) => t.name;
  trackByName = (_: number, item: any) => (item && (item.name ?? item));
  trackByTitle = (_: number, item: any) => item.title ?? item;
}
