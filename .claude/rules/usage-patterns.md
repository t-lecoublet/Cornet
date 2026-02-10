# Patterns d'utilisation Cornet

## Formulaires

### Champ avec label et validation

```vue
<DuLabelInputValidator
  type="label"
  inputType="email"
  placeholder="votre@email.com"
  required
  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
  title="Email invalide"
  v-model="email"
>
  Email
</DuLabelInputValidator>
```

### Label + Input simple

```vue
<DuLabel type="label">
  Nom
  <DuInputField type="text" v-model="name" required />
</DuLabel>
```

### Select avec objets et recherche

```vue
<DuSelect
  v-model="selected"
  :options="items"
  placeholder="Choisir..."
  trackBy="id"
  labelBy="name"
  returnObject
  searchableInside
/>
```

### Select multi avec checkboxes

```vue
<DuSelect
  v-model="selectedTags"
  :options="tags"
  multiple
  checkboxes
  searchableInside
  trackBy="id"
  labelBy="name"
/>
```

### Search avec auto-complétion

```vue
<DuSearch
  v-model="author"
  name="author"
  id="author-search"
  :listValues="[{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]"
  :limit="5"
/>
```

### Groupe radio / checkbox

```vue
<!-- Radios -->
<label class="flex items-center gap-2">
  <DuRadio name="plan" value="free" v-model="plan" variant="primary" />
  Gratuit
</label>

<!-- Checkbox -->
<label class="flex items-center gap-2">
  <DuCheckbox v-model="newsletter" variant="primary" />
  Newsletter
</label>
```

---

## Navigation

### Menu avec sous-menus

```vue
<DuMenu
  :items="[
    { label: 'Dashboard', value: 'dash', href: '/' },
    { label: 'Produits', subItems: [
      { label: 'Liste', href: '/products' },
      { label: 'Ajouter', href: '/products/add' }
    ]},
    { label: 'Admin', disabled: true }
  ]"
  direction="vertical"
  :activeItem="currentPage"
/>
```

### Pagination

```vue
<DuPagination
  v-model="page"
  :total="250"
  :perPage="10"
  variant="primary"
  showFirst
  showLast
  showEllipsis
  :maxPages="5"
/>
```

### Tabs avec contenu

```vue
<DuTabs :items="tabs" type="border">
  <template #content-0>Contenu tab 1</template>
  <template #content-1>Contenu tab 2</template>
</DuTabs>
```

### Steps wizard

```vue
<DuSteps
  :items="[
    { label: 'Info', dataContent: '1' },
    { label: 'Paiement', dataContent: '2' },
    { label: 'Confirmation', dataContent: '3' }
  ]"
  :activeSteps="[0, 1]"
  variant="primary"
  direction="steps-horizontal"
/>
```

---

## Feedback

### Alert avec variantes

```vue
<!-- Succès auto-dismiss -->
<DuAlert variant="success" dismissible autoDismissible icon>
  Opération réussie !
</DuAlert>

<!-- Erreur soft -->
<DuAlert variant="error" soft icon>
  Une erreur est survenue.
</DuAlert>
```

### Toast notifications

```vue
<DuToast horizontalPosition="end" verticalPosition="top">
  <DuAlert v-for="toast in toasts" :variant="toast.type" dismissible>
    {{ toast.message }}
  </DuAlert>
</DuToast>
```

### Loading states

```vue
<!-- Spinner -->
<DuLoading animation="spinner" size="lg" variant="primary" />

<!-- Skeleton placeholder -->
<DuSkeleton class="h-32 w-full" />
<DuSkeleton class="h-4 w-3/4" />

<!-- Progress bar -->
<DuProgress :value="75" :max="100" variant="primary" />
```

### Modal de confirmation

```vue
<DuModal v-model:open="isOpen" closeButton closeOnEscape placement="middle">
  <h3 class="font-bold text-lg">Confirmation</h3>
  <p>Êtes-vous sûr ?</p>
  <div class="flex gap-2 justify-end">
    <DuButton @click="isOpen = false" variant="neutral">Annuler</DuButton>
    <DuButton @click="confirm" variant="primary">Confirmer</DuButton>
  </div>
</DuModal>
```

---

## Layout

### Drawer responsive

```vue
<DuDrawer v-model="drawerOpen" position="start" responsive :items="menuItems">
  <template #default>
    <DuNavbar>
      <template #start>
        <DuButton @click="drawerOpen = !drawerOpen" ghost square>Menu</DuButton>
      </template>
    </DuNavbar>
    <main><RouterView /></main>
  </template>
</DuDrawer>
```

### Éléments joints

```vue
<!-- Input + bouton -->
<DuJoin direction="horizontal">
  <DuInputField v-model="query" placeholder="Rechercher..." class="join-item" />
  <DuButton variant="primary" class="join-item">Go</DuButton>
</DuJoin>
```

### Cards grid

```vue
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <DuCard v-for="item in items" :key="item.id" :title="item.title" bordered>
    <p>{{ item.description }}</p>
    <template #actions>
      <DuButton variant="primary" size="sm">Détail</DuButton>
    </template>
  </DuCard>
</div>
```

---

## Bonnes pratiques

### Toujours utiliser v-model

```vue
<!-- Correct -->
<DuInputField v-model="value" />
<DuSelect v-model="selected" />
<DuCheckbox v-model="checked" />

<!-- Incorrect : pas de binding -->
<DuInputField />
```

### Désactiver les boutons pendant les actions async

```vue
<DuButton :disabled="loading" variant="primary" @click="submit">
  {{ loading ? 'Chargement...' : 'Envoyer' }}
</DuButton>
```

### Typer les données avec les interfaces du kit

```typescript
import type { MenuItem } from 'daisyui-vue-kit/types'
import type { SearchOption } from 'daisyui-vue-kit/types'

const items: MenuItem[] = [{ label: 'Home', href: '/' }]
```

### Toujours wrapper les inputs avec DuLabel

```vue
<!-- Correct : accessible -->
<DuLabel type="label">
  Email
  <DuInputField type="email" v-model="email" />
</DuLabel>

<!-- Incorrect : pas de label -->
<DuInputField type="email" v-model="email" />
```

### Utiliser `customClass` plutôt que de modifier le composant

```vue
<!-- Correct : classes personnalisées via prop -->
<DuButton customClass="shadow-xl hover:scale-105" variant="primary">
  Stylisé
</DuButton>

<!-- Incorrect : surcharge directe des styles internes -->
```
