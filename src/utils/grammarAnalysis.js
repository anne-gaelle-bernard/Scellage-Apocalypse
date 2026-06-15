// ─── Verb dictionary ──────────────────────────────────────────────────────────
// word (lowercased, no accents stripped) → { inf, tense, pers }
export const VERB_FORMS = {
  // ÊTRE
  suis:{'inf':'être','tense':'Présent','pers':'1re pers. sing.'},
  es:{'inf':'être','tense':'Présent','pers':'2e pers. sing.'},
  est:{'inf':'être','tense':'Présent','pers':'3e pers. sing.'},
  sommes:{'inf':'être','tense':'Présent','pers':'1re pers. pl.'},
  êtes:{'inf':'être','tense':'Présent','pers':'2e pers. pl.'},
  sont:{'inf':'être','tense':'Présent','pers':'3e pers. pl.'},
  était:{'inf':'être','tense':'Imparfait','pers':'3e pers. sing.'},
  étaient:{'inf':'être','tense':'Imparfait','pers':'3e pers. pl.'},
  étais:{'inf':'être','tense':'Imparfait','pers':'1re/2e pers. sing.'},
  étions:{'inf':'être','tense':'Imparfait','pers':'1re pers. pl.'},
  étiez:{'inf':'être','tense':'Imparfait','pers':'2e pers. pl.'},
  fus:{'inf':'être','tense':'Passé simple','pers':'1re pers. sing.'},
  fut:{'inf':'être','tense':'Passé simple','pers':'3e pers. sing.'},
  furent:{'inf':'être','tense':'Passé simple','pers':'3e pers. pl.'},
  fûmes:{'inf':'être','tense':'Passé simple','pers':'1re pers. pl.'},
  sera:{'inf':'être','tense':'Futur','pers':'3e pers. sing.'},
  serai:{'inf':'être','tense':'Futur','pers':'1re pers. sing.'},
  seras:{'inf':'être','tense':'Futur','pers':'2e pers. sing.'},
  serons:{'inf':'être','tense':'Futur','pers':'1re pers. pl.'},
  serez:{'inf':'être','tense':'Futur','pers':'2e pers. pl.'},
  seront:{'inf':'être','tense':'Futur','pers':'3e pers. pl.'},
  soit:{'inf':'être','tense':'Subjonctif','pers':'3e pers. sing.'},
  soient:{'inf':'être','tense':'Subjonctif','pers':'3e pers. pl.'},
  sois:{'inf':'être','tense':'Impératif','pers':'2e pers. sing.'},
  étant:{'inf':'être','tense':'Participe présent','pers':'—'},
  été:{'inf':'être','tense':'Participe passé','pers':'—'},
  // AVOIR
  ai:{'inf':'avoir','tense':'Présent','pers':'1re pers. sing.'},
  as:{'inf':'avoir','tense':'Présent','pers':'2e pers. sing.'},
  a:{'inf':'avoir','tense':'Présent','pers':'3e pers. sing.'},
  avons:{'inf':'avoir','tense':'Présent','pers':'1re pers. pl.'},
  avez:{'inf':'avoir','tense':'Présent','pers':'2e pers. pl.'},
  ont:{'inf':'avoir','tense':'Présent','pers':'3e pers. pl.'},
  avait:{'inf':'avoir','tense':'Imparfait','pers':'3e pers. sing.'},
  avaient:{'inf':'avoir','tense':'Imparfait','pers':'3e pers. pl.'},
  avais:{'inf':'avoir','tense':'Imparfait','pers':'1re/2e pers. sing.'},
  avions:{'inf':'avoir','tense':'Imparfait','pers':'1re pers. pl.'},
  eut:{'inf':'avoir','tense':'Passé simple','pers':'3e pers. sing.'},
  eurent:{'inf':'avoir','tense':'Passé simple','pers':'3e pers. pl.'},
  eus:{'inf':'avoir','tense':'Passé simple','pers':'1re pers. sing.'},
  aura:{'inf':'avoir','tense':'Futur','pers':'3e pers. sing.'},
  auront:{'inf':'avoir','tense':'Futur','pers':'3e pers. pl.'},
  aurai:{'inf':'avoir','tense':'Futur','pers':'1re pers. sing.'},
  ait:{'inf':'avoir','tense':'Subjonctif','pers':'3e pers. sing.'},
  aient:{'inf':'avoir','tense':'Subjonctif','pers':'3e pers. pl.'},
  ayant:{'inf':'avoir','tense':'Participe présent','pers':'—'},
  eu:{'inf':'avoir','tense':'Participe passé','pers':'—'},
  // FAIRE
  fait:{'inf':'faire','tense':'Présent / Part. passé','pers':'3e pers. sing.'},
  faites:{'inf':'faire','tense':'Présent','pers':'2e pers. pl.'},
  faisait:{'inf':'faire','tense':'Imparfait','pers':'3e pers. sing.'},
  faisaient:{'inf':'faire','tense':'Imparfait','pers':'3e pers. pl.'},
  fit:{'inf':'faire','tense':'Passé simple','pers':'3e pers. sing.'},
  firent:{'inf':'faire','tense':'Passé simple','pers':'3e pers. pl.'},
  fera:{'inf':'faire','tense':'Futur','pers':'3e pers. sing.'},
  feront:{'inf':'faire','tense':'Futur','pers':'3e pers. pl.'},
  fasse:{'inf':'faire','tense':'Subjonctif','pers':'3e pers. sing.'},
  // VENIR
  vient:{'inf':'venir','tense':'Présent','pers':'3e pers. sing.'},
  viennent:{'inf':'venir','tense':'Présent','pers':'3e pers. pl.'},
  viens:{'inf':'venir','tense':'Présent / Impératif','pers':'1re/2e pers. sing.'},
  venait:{'inf':'venir','tense':'Imparfait','pers':'3e pers. sing.'},
  venaient:{'inf':'venir','tense':'Imparfait','pers':'3e pers. pl.'},
  vint:{'inf':'venir','tense':'Passé simple','pers':'3e pers. sing.'},
  vinrent:{'inf':'venir','tense':'Passé simple','pers':'3e pers. pl.'},
  viendra:{'inf':'venir','tense':'Futur','pers':'3e pers. sing.'},
  viendront:{'inf':'venir','tense':'Futur','pers':'3e pers. pl.'},
  venu:{'inf':'venir','tense':'Participe passé','pers':'—'},
  venue:{'inf':'venir','tense':'Participe passé','pers':'—'},
  venus:{'inf':'venir','tense':'Participe passé','pers':'—'},
  venant:{'inf':'venir','tense':'Participe présent','pers':'—'},
  // VOIR
  vois:{'inf':'voir','tense':'Présent / Impératif','pers':'1re/2e pers. sing.'},
  voit:{'inf':'voir','tense':'Présent','pers':'3e pers. sing.'},
  voient:{'inf':'voir','tense':'Présent','pers':'3e pers. pl.'},
  voyait:{'inf':'voir','tense':'Imparfait','pers':'3e pers. sing.'},
  vis:{'inf':'voir','tense':'Passé simple','pers':'1re pers. sing.'},
  vit:{'inf':'voir','tense':'Passé simple','pers':'3e pers. sing.'},
  virent:{'inf':'voir','tense':'Passé simple','pers':'3e pers. pl.'},
  verra:{'inf':'voir','tense':'Futur','pers':'3e pers. sing.'},
  verront:{'inf':'voir','tense':'Futur','pers':'3e pers. pl.'},
  vu:{'inf':'voir','tense':'Participe passé','pers':'—'},
  voyant:{'inf':'voir','tense':'Participe présent','pers':'—'},
  // DIRE
  dit:{'inf':'dire','tense':'Présent / Passé simple','pers':'3e pers. sing.'},
  dis:{'inf':'dire','tense':'Passé simple','pers':'1re pers. sing.'},
  disent:{'inf':'dire','tense':'Présent','pers':'3e pers. pl.'},
  disant:{'inf':'dire','tense':'Participe présent','pers':'—'},
  disait:{'inf':'dire','tense':'Imparfait','pers':'3e pers. sing.'},
  disaient:{'inf':'dire','tense':'Imparfait','pers':'3e pers. pl.'},
  dirent:{'inf':'dire','tense':'Passé simple','pers':'3e pers. pl.'},
  dira:{'inf':'dire','tense':'Futur','pers':'3e pers. sing.'},
  diront:{'inf':'dire','tense':'Futur','pers':'3e pers. pl.'},
  dites:{'inf':'dire','tense':'Présent / Impératif','pers':'2e pers. pl.'},
  disons:{'inf':'dire','tense':'Présent','pers':'1re pers. pl.'},
  // PRENDRE
  prend:{'inf':'prendre','tense':'Présent','pers':'3e pers. sing.'},
  prends:{'inf':'prendre','tense':'Présent / Impératif','pers':'1re/2e pers. sing.'},
  prennent:{'inf':'prendre','tense':'Présent','pers':'3e pers. pl.'},
  prenait:{'inf':'prendre','tense':'Imparfait','pers':'3e pers. sing.'},
  prit:{'inf':'prendre','tense':'Passé simple','pers':'3e pers. sing.'},
  prirent:{'inf':'prendre','tense':'Passé simple','pers':'3e pers. pl.'},
  pris:{'inf':'prendre','tense':'Passé simple / Part. passé','pers':'1re pers. sing.'},
  prise:{'inf':'prendre','tense':'Participe passé','pers':'—'},
  // TENIR
  tient:{'inf':'tenir','tense':'Présent','pers':'3e pers. sing.'},
  tiens:{'inf':'tenir','tense':'Présent / Impératif','pers':'1re/2e pers. sing.'},
  tiennent:{'inf':'tenir','tense':'Présent','pers':'3e pers. pl.'},
  tenait:{'inf':'tenir','tense':'Imparfait','pers':'3e pers. sing.'},
  tenaient:{'inf':'tenir','tense':'Imparfait','pers':'3e pers. pl.'},
  tint:{'inf':'tenir','tense':'Passé simple','pers':'3e pers. sing.'},
  tinrent:{'inf':'tenir','tense':'Passé simple','pers':'3e pers. pl.'},
  tenu:{'inf':'tenir','tense':'Participe passé','pers':'—'},
  // DONNER
  donne:{'inf':'donner','tense':'Présent / Impératif','pers':'3e pers. sing.'},
  donnent:{'inf':'donner','tense':'Présent','pers':'3e pers. pl.'},
  donnait:{'inf':'donner','tense':'Imparfait','pers':'3e pers. sing.'},
  donnaient:{'inf':'donner','tense':'Imparfait','pers':'3e pers. pl.'},
  donna:{'inf':'donner','tense':'Passé simple','pers':'3e pers. sing.'},
  donnèrent:{'inf':'donner','tense':'Passé simple','pers':'3e pers. pl.'},
  donnera:{'inf':'donner','tense':'Futur','pers':'3e pers. sing.'},
  donneront:{'inf':'donner','tense':'Futur','pers':'3e pers. pl.'},
  donné:{'inf':'donner','tense':'Participe passé','pers':'—'},
  donnée:{'inf':'donner','tense':'Participe passé','pers':'—'},
  donnés:{'inf':'donner','tense':'Participe passé','pers':'—'},
  données:{'inf':'donner','tense':'Participe passé','pers':'—'},
  donnant:{'inf':'donner','tense':'Participe présent','pers':'—'},
  // OUVRIR
  ouvre:{'inf':'ouvrir','tense':'Présent / Impératif','pers':'3e pers. sing.'},
  ouvrit:{'inf':'ouvrir','tense':'Passé simple','pers':'3e pers. sing.'},
  ouvrirent:{'inf':'ouvrir','tense':'Passé simple','pers':'3e pers. pl.'},
  ouvert:{'inf':'ouvrir','tense':'Participe passé','pers':'—'},
  ouverts:{'inf':'ouvrir','tense':'Participe passé','pers':'—'},
  ouverte:{'inf':'ouvrir','tense':'Participe passé','pers':'—'},
  ouvertes:{'inf':'ouvrir','tense':'Participe passé','pers':'—'},
  ouvrait:{'inf':'ouvrir','tense':'Imparfait','pers':'3e pers. sing.'},
  ouvraient:{'inf':'ouvrir','tense':'Imparfait','pers':'3e pers. pl.'},
  // ENTENDRE
  entend:{'inf':'entendre','tense':'Présent','pers':'3e pers. sing.'},
  entends:{'inf':'entendre','tense':'Présent / Impératif','pers':'1re/2e pers. sing.'},
  entendent:{'inf':'entendre','tense':'Présent','pers':'3e pers. pl.'},
  entendait:{'inf':'entendre','tense':'Imparfait','pers':'3e pers. sing.'},
  entendaient:{'inf':'entendre','tense':'Imparfait','pers':'3e pers. pl.'},
  entendit:{'inf':'entendre','tense':'Passé simple','pers':'3e pers. sing.'},
  entendirent:{'inf':'entendre','tense':'Passé simple','pers':'3e pers. pl.'},
  entendis:{'inf':'entendre','tense':'Passé simple','pers':'1re pers. sing.'},
  entendu:{'inf':'entendre','tense':'Participe passé','pers':'—'},
  entendant:{'inf':'entendre','tense':'Participe présent','pers':'—'},
  // ÉCRIRE
  écris:{'inf':'écrire','tense':'Présent / Impératif','pers':'1re/2e pers. sing.'},
  écrit:{'inf':'écrire','tense':'Présent / Part. passé','pers':'3e pers. sing.'},
  écrivent:{'inf':'écrire','tense':'Présent','pers':'3e pers. pl.'},
  écrivit:{'inf':'écrire','tense':'Passé simple','pers':'3e pers. sing.'},
  écrivirent:{'inf':'écrire','tense':'Passé simple','pers':'3e pers. pl.'},
  écrits:{'inf':'écrire','tense':'Participe passé','pers':'—'},
  écrite:{'inf':'écrire','tense':'Participe passé','pers':'—'},
  écrites:{'inf':'écrire','tense':'Participe passé','pers':'—'},
  // LIRE
  lit:{'inf':'lire','tense':'Présent','pers':'3e pers. sing.'},
  lis:{'inf':'lire','tense':'Présent / Impératif','pers':'1re/2e pers. sing.'},
  lisent:{'inf':'lire','tense':'Présent','pers':'3e pers. pl.'},
  lu:{'inf':'lire','tense':'Participe passé','pers':'—'},
  lut:{'inf':'lire','tense':'Passé simple','pers':'3e pers. sing.'},
  // GARDER
  garde:{'inf':'garder','tense':'Présent / Impératif','pers':'3e pers. sing.'},
  gardent:{'inf':'garder','tense':'Présent','pers':'3e pers. pl.'},
  gardait:{'inf':'garder','tense':'Imparfait','pers':'3e pers. sing.'},
  garda:{'inf':'garder','tense':'Passé simple','pers':'3e pers. sing.'},
  gardèrent:{'inf':'garder','tense':'Passé simple','pers':'3e pers. pl.'},
  gardé:{'inf':'garder','tense':'Participe passé','pers':'—'},
  gardés:{'inf':'garder','tense':'Participe passé','pers':'—'},
  // POUVOIR
  peut:{'inf':'pouvoir','tense':'Présent','pers':'3e pers. sing.'},
  peux:{'inf':'pouvoir','tense':'Présent','pers':'1re/2e pers. sing.'},
  peuvent:{'inf':'pouvoir','tense':'Présent','pers':'3e pers. pl.'},
  pouvait:{'inf':'pouvoir','tense':'Imparfait','pers':'3e pers. sing.'},
  pouvaient:{'inf':'pouvoir','tense':'Imparfait','pers':'3e pers. pl.'},
  put:{'inf':'pouvoir','tense':'Passé simple','pers':'3e pers. sing.'},
  purent:{'inf':'pouvoir','tense':'Passé simple','pers':'3e pers. pl.'},
  pourra:{'inf':'pouvoir','tense':'Futur','pers':'3e pers. sing.'},
  pourront:{'inf':'pouvoir','tense':'Futur','pers':'3e pers. pl.'},
  puisse:{'inf':'pouvoir','tense':'Subjonctif','pers':'3e pers. sing.'},
  pu:{'inf':'pouvoir','tense':'Participe passé','pers':'—'},
  // VOULOIR
  veut:{'inf':'vouloir','tense':'Présent','pers':'3e pers. sing.'},
  veux:{'inf':'vouloir','tense':'Présent','pers':'1re/2e pers. sing.'},
  veulent:{'inf':'vouloir','tense':'Présent','pers':'3e pers. pl.'},
  voulait:{'inf':'vouloir','tense':'Imparfait','pers':'3e pers. sing.'},
  voulut:{'inf':'vouloir','tense':'Passé simple','pers':'3e pers. sing.'},
  voulurent:{'inf':'vouloir','tense':'Passé simple','pers':'3e pers. pl.'},
  voudra:{'inf':'vouloir','tense':'Futur','pers':'3e pers. sing.'},
  voulu:{'inf':'vouloir','tense':'Participe passé','pers':'—'},
  // SORTIR / PARTIR
  sort:{'inf':'sortir','tense':'Présent','pers':'3e pers. sing.'},
  sortait:{'inf':'sortir','tense':'Imparfait','pers':'3e pers. sing.'},
  sortit:{'inf':'sortir','tense':'Passé simple','pers':'3e pers. sing.'},
  sortirent:{'inf':'sortir','tense':'Passé simple','pers':'3e pers. pl.'},
  sorti:{'inf':'sortir','tense':'Participe passé','pers':'—'},
  sortant:{'inf':'sortir','tense':'Participe présent','pers':'—'},
  partît:{'inf':'partir','tense':'Passé simple','pers':'3e pers. sing.'},
  // MONTER / DESCENDRE
  monta:{'inf':'monter','tense':'Passé simple','pers':'3e pers. sing.'},
  montèrent:{'inf':'monter','tense':'Passé simple','pers':'3e pers. pl.'},
  monte:{'inf':'monter','tense':'Présent / Impératif','pers':'3e pers. sing.'},
  montant:{'inf':'monter','tense':'Participe présent','pers':'—'},
  descendit:{'inf':'descendre','tense':'Passé simple','pers':'3e pers. sing.'},
  descendirent:{'inf':'descendre','tense':'Passé simple','pers':'3e pers. pl.'},
  descend:{'inf':'descendre','tense':'Présent','pers':'3e pers. sing.'},
  descendant:{'inf':'descendre','tense':'Participe présent','pers':'—'},
  // CRIER / CHANTER
  cria:{'inf':'crier','tense':'Passé simple','pers':'3e pers. sing.'},
  crièrent:{'inf':'crier','tense':'Passé simple','pers':'3e pers. pl.'},
  criait:{'inf':'crier','tense':'Imparfait','pers':'3e pers. sing.'},
  criaient:{'inf':'crier','tense':'Imparfait','pers':'3e pers. pl.'},
  chanta:{'inf':'chanter','tense':'Passé simple','pers':'3e pers. sing.'},
  chantèrent:{'inf':'chanter','tense':'Passé simple','pers':'3e pers. pl.'},
  chantait:{'inf':'chanter','tense':'Imparfait','pers':'3e pers. sing.'},
  chantaient:{'inf':'chanter','tense':'Imparfait','pers':'3e pers. pl.'},
  // ADORER / TOMBER
  adora:{'inf':'adorer','tense':'Passé simple','pers':'3e pers. sing.'},
  adorèrent:{'inf':'adorer','tense':'Passé simple','pers':'3e pers. pl.'},
  adorait:{'inf':'adorer','tense':'Imparfait','pers':'3e pers. sing.'},
  adoraient:{'inf':'adorer','tense':'Imparfait','pers':'3e pers. pl.'},
  adore:{'inf':'adorer','tense':'Présent / Impératif','pers':'3e pers. sing.'},
  adorent:{'inf':'adorer','tense':'Présent','pers':'3e pers. pl.'},
  tomba:{'inf':'tomber','tense':'Passé simple','pers':'3e pers. sing.'},
  tombèrent:{'inf':'tomber','tense':'Passé simple','pers':'3e pers. pl.'},
  tombait:{'inf':'tomber','tense':'Imparfait','pers':'3e pers. sing.'},
  tombe:{'inf':'tomber','tense':'Présent / Impératif','pers':'3e pers. sing.'},
  tombé:{'inf':'tomber','tense':'Participe passé','pers':'—'},
  // RECEVOIR
  reçut:{'inf':'recevoir','tense':'Passé simple','pers':'3e pers. sing.'},
  reçurent:{'inf':'recevoir','tense':'Passé simple','pers':'3e pers. pl.'},
  reçoit:{'inf':'recevoir','tense':'Présent','pers':'3e pers. sing.'},
  reçoivent:{'inf':'recevoir','tense':'Présent','pers':'3e pers. pl.'},
  reçu:{'inf':'recevoir','tense':'Participe passé','pers':'—'},
  // VAINCRE
  vainquit:{'inf':'vaincre','tense':'Passé simple','pers':'3e pers. sing.'},
  vainquirent:{'inf':'vaincre','tense':'Passé simple','pers':'3e pers. pl.'},
  vaincu:{'inf':'vaincre','tense':'Participe passé','pers':'—'},
  vaincra:{'inf':'vaincre','tense':'Futur','pers':'3e pers. sing.'},
  // MOURIR
  mourut:{'inf':'mourir','tense':'Passé simple','pers':'3e pers. sing.'},
  moururent:{'inf':'mourir','tense':'Passé simple','pers':'3e pers. pl.'},
  mort:{'inf':'mourir','tense':'Participe passé','pers':'—'},
  morte:{'inf':'mourir','tense':'Participe passé','pers':'—'},
  morts:{'inf':'mourir','tense':'Participe passé','pers':'—'},
  mortes:{'inf':'mourir','tense':'Participe passé','pers':'—'},
  // FRAPPER / TUER / SAISIR
  frappa:{'inf':'frapper','tense':'Passé simple','pers':'3e pers. sing.'},
  frappèrent:{'inf':'frapper','tense':'Passé simple','pers':'3e pers. pl.'},
  frappe:{'inf':'frapper','tense':'Présent / Impératif','pers':'3e pers. sing.'},
  frappait:{'inf':'frapper','tense':'Imparfait','pers':'3e pers. sing.'},
  tua:{'inf':'tuer','tense':'Passé simple','pers':'3e pers. sing.'},
  tuèrent:{'inf':'tuer','tense':'Passé simple','pers':'3e pers. pl.'},
  tué:{'inf':'tuer','tense':'Participe passé','pers':'—'},
  tués:{'inf':'tuer','tense':'Participe passé','pers':'—'},
  saisit:{'inf':'saisir','tense':'Passé simple','pers':'3e pers. sing.'},
  saisirent:{'inf':'saisir','tense':'Passé simple','pers':'3e pers. pl.'},
  // RÉGNER / ENVOYER
  règne:{'inf':'régner','tense':'Présent / Impératif','pers':'3e pers. sing.'},
  régnait:{'inf':'régner','tense':'Imparfait','pers':'3e pers. sing.'},
  régna:{'inf':'régner','tense':'Passé simple','pers':'3e pers. sing.'},
  régnèrent:{'inf':'régner','tense':'Passé simple','pers':'3e pers. pl.'},
  règnera:{'inf':'régner','tense':'Futur','pers':'3e pers. sing.'},
  régneront:{'inf':'régner','tense':'Futur','pers':'3e pers. pl.'},
  envoya:{'inf':'envoyer','tense':'Passé simple','pers':'3e pers. sing.'},
  envoyèrent:{'inf':'envoyer','tense':'Passé simple','pers':'3e pers. pl.'},
  envoie:{'inf':'envoyer','tense':'Présent / Impératif','pers':'3e pers. sing.'},
  envoyait:{'inf':'envoyer','tense':'Imparfait','pers':'3e pers. sing.'},
  envoyé:{'inf':'envoyer','tense':'Participe passé','pers':'—'},
  // CONNAÎTRE / SAVOIR
  connaît:{'inf':'connaître','tense':'Présent','pers':'3e pers. sing.'},
  connut:{'inf':'connaître','tense':'Passé simple','pers':'3e pers. sing.'},
  connurent:{'inf':'connaître','tense':'Passé simple','pers':'3e pers. pl.'},
  connu:{'inf':'connaître','tense':'Participe passé','pers':'—'},
  sait:{'inf':'savoir','tense':'Présent','pers':'3e pers. sing.'},
  savent:{'inf':'savoir','tense':'Présent','pers':'3e pers. pl.'},
  savait:{'inf':'savoir','tense':'Imparfait','pers':'3e pers. sing.'},
  sut:{'inf':'savoir','tense':'Passé simple','pers':'3e pers. sing.'},
  surent:{'inf':'savoir','tense':'Passé simple','pers':'3e pers. pl.'},
  su:{'inf':'savoir','tense':'Participe passé','pers':'—'},
  sachant:{'inf':'savoir','tense':'Participe présent','pers':'—'},
  // METTRE / PORTER
  mit:{'inf':'mettre','tense':'Passé simple','pers':'3e pers. sing.'},
  mirent:{'inf':'mettre','tense':'Passé simple','pers':'3e pers. pl.'},
  mettait:{'inf':'mettre','tense':'Imparfait','pers':'3e pers. sing.'},
  mis:{'inf':'mettre','tense':'Participe passé','pers':'—'},
  mise:{'inf':'mettre','tense':'Participe passé','pers':'—'},
  porta:{'inf':'porter','tense':'Passé simple','pers':'3e pers. sing.'},
  portèrent:{'inf':'porter','tense':'Passé simple','pers':'3e pers. pl.'},
  portait:{'inf':'porter','tense':'Imparfait','pers':'3e pers. sing.'},
  portaient:{'inf':'porter','tense':'Imparfait','pers':'3e pers. pl.'},
  porté:{'inf':'porter','tense':'Participe passé','pers':'—'},
  // SCELLER / FERMER / BRÛLER
  scella:{'inf':'sceller','tense':'Passé simple','pers':'3e pers. sing.'},
  scellé:{'inf':'sceller','tense':'Participe passé','pers':'—'},
  scellés:{'inf':'sceller','tense':'Participe passé','pers':'—'},
  ferma:{'inf':'fermer','tense':'Passé simple','pers':'3e pers. sing.'},
  fermèrent:{'inf':'fermer','tense':'Passé simple','pers':'3e pers. pl.'},
  fermé:{'inf':'fermer','tense':'Participe passé','pers':'—'},
  brûlait:{'inf':'brûler','tense':'Imparfait','pers':'3e pers. sing.'},
  brûlaient:{'inf':'brûler','tense':'Imparfait','pers':'3e pers. pl.'},
  brûla:{'inf':'brûler','tense':'Passé simple','pers':'3e pers. sing.'},
  brûle:{'inf':'brûler','tense':'Présent','pers':'3e pers. sing.'},
  brûlent:{'inf':'brûler','tense':'Présent','pers':'3e pers. pl.'},
  // ATTESTER / MONTRER
  attesta:{'inf':'attester','tense':'Passé simple','pers':'3e pers. sing.'},
  attesté:{'inf':'attester','tense':'Participe passé','pers':'—'},
  montre:{'inf':'montrer','tense':'Présent / Impératif','pers':'3e pers. sing.'},
  montra:{'inf':'montrer','tense':'Passé simple','pers':'3e pers. sing.'},
  montré:{'inf':'montrer','tense':'Participe passé','pers':'—'},
};

// ─── Tense explanations ───────────────────────────────────────────────────────
export const TENSE_EXPL = {
  'Présent':           'Action qui se déroule maintenant, état durable, ou vérité générale.',
  'Imparfait':         'Action passée durable ou répétée. Il décrit le contexte, le décor. Courant dans les récits bibliques pour la description.',
  'Passé simple':      'Action passée ponctuelle et terminée. Temps narratif par excellence dans les textes littéraires et bibliques. Très fréquent dans l\'Apocalypse.',
  'Futur':             'Action qui aura lieu dans le futur. Ici souvent une promesse, une prophétie, ou une révélation divine.',
  'Subjonctif':        'Exprime le souhait, le doute, la nécessité, l\'émotion. Apparaît généralement après « que ».',
  'Impératif':         'Ordre, instruction ou exhortation directe au lecteur.',
  'Participe passé':   'Utilisé dans les temps composés (avec être ou avoir) ou comme adjectif qualificatif.',
  'Participe présent': 'Action simultanée à l\'action principale. Équivaut parfois à « en + gérondif ».',
  'Infinitif':         'Forme de base du verbe, non conjuguée. S\'utilise après un verbe principal (ex : « pour montrer »).',
};

// ─── Grammar items ────────────────────────────────────────────────────────────
export const GRAMMAR_CATS = {
  article_def: {
    label: 'Article défini', color: '#2563eb',
    words: new Set(['le','la','les','l',"l'"]),
    expl: 'Détermine un nom précis, déjà connu ou unique. Ex : « le temps », « la prophétie ».',
  },
  article_indef: {
    label: 'Article indéfini', color: '#0891b2',
    words: new Set(['un','une','des']),
    expl: 'Introduit un nom non précisé ou inconnu. Ex : « une voix ».',
  },
  article_part: {
    label: 'Article partitif / contracté', color: '#0e7490',
    words: new Set(['du','de la','au','aux']),
    expl: '« Du » = de + le. « Au » = à + le. Exprime une partie ou une destination.',
  },
  pron_sujet: {
    label: 'Pronom personnel sujet', color: '#7c3aed',
    words: new Set(['je','tu','il','elle','nous','vous','ils','elles','on']),
    expl: 'Remplace le sujet de la phrase. Précède généralement le verbe conjugué.',
  },
  pron_relatif: {
    label: 'Pronom relatif', color: '#6d28d9',
    words: new Set(['qui','que','qu','qu\'','dont','où','lequel','laquelle','lesquels','lesquelles','auquel','duquel']),
    expl: 'Relie une proposition subordonnée relative au nom qu\'elle complète. Ex : « celui qui lit », « les choses qui sont écrites ».',
  },
  pron_demo: {
    label: 'Pronom démonstratif', color: '#9333ea',
    words: new Set(['celui','celle','ceux','celles','ce','ceci','cela','ça']),
    expl: 'Désigne un être ou une chose sans le nommer. Ex : « celui qui », « ceux qui ».',
  },
  adj_demo: {
    label: 'Adjectif démonstratif', color: '#a21caf',
    words: new Set(['ce','cet','cette','ces']),
    expl: 'Détermine un nom en montrant ou en désignant. Ex : « cette prophétie ».',
  },
  adj_poss: {
    label: 'Adjectif possessif', color: '#be185d',
    words: new Set(['mon','ma','mes','ton','ta','tes','son','sa','ses','notre','nos','votre','vos','leur','leurs']),
    expl: 'Indique la possession ou l\'appartenance. Ex : « son ange », « ses serviteurs ».',
  },
  prep: {
    label: 'Préposition', color: '#059669',
    words: new Set(['à','de','en','par','pour','sur','sous','dans','avec','sans','vers','entre','parmi','selon','devant','derrière','après','avant','pendant','contre','près','loin']),
    expl: 'Relie deux éléments de la phrase et indique un rapport de lieu, de temps, de but, de cause, etc.',
  },
  conj_coord: {
    label: 'Conjonction de coordination', color: '#d97706',
    words: new Set(['mais','ou','et','donc','or','ni','car']),
    expl: 'Relie deux propositions ou deux mots de même nature. Moyen mnémotechnique : « Mais Où Est Donc Ornicar ».',
  },
  conj_sub: {
    label: 'Conjonction de subordination', color: '#b45309',
    words: new Set(['que','quand','lorsque','comme','si','puisque','quoique','bien que','afin que','pour que','parce que','avant que']),
    expl: 'Introduit une proposition subordonnée et la relie à la proposition principale.',
  },
};

// Words that appear in multiple categories — context-sensitive disambiguation
const AMBIGUOUS = new Set(['que','qu\'','ce','qui']);

// ─── Punctuation rules ────────────────────────────────────────────────────────
export const PUNCT_RULES = [
  { char:',',  name:'Virgule',             color:'#2563eb', expl:'Sépare des éléments dans une liste, isole une proposition relative ou une apposition, ou marque une pause légère.' },
  { char:';',  name:'Point-virgule',        color:'#7c3aed', expl:'Sépare deux propositions indépendantes mais liées par le sens. Plus fort que la virgule, moins fort que le point.' },
  { char:':',  name:'Deux-points',          color:'#9333ea', expl:'Annonce une explication, une citation, une liste, ou un discours direct. Ex : « Jean aux sept Églises : … ».' },
  { char:'!',  name:'Point d\'exclamation', color:'#dc2626', expl:'Marque une exclamation, un ordre, une émotion forte ou une louange. Très courant dans les doxologies de l\'Apocalypse.' },
  { char:'?',  name:'Point d\'interrogation',color:'#ea580c',expl:'Marque une question directe.' },
  { char:'…',  name:'Points de suspension', color:'#6b7280', expl:'Indique une interruption, une hésitation ou laisse la phrase volontairement inachevée.' },
  { char:'«',  name:'Guillemet ouvrant',    color:'#0891b2', expl:'Ouvre un discours direct, une citation ou met un mot en valeur.' },
  { char:'»',  name:'Guillemet fermant',    color:'#0891b2', expl:'Ferme un discours direct ou une citation.' },
  { char:'—',  name:'Tiret long',           color:'#059669', expl:'Introduit une réplique dans un dialogue ou isole une incise (parenthèse explicative).' },
  { char:'-',  name:'Trait d\'union',       color:'#64748b', expl:'Relie les éléments d\'un mot composé (ex : « premier-né ») ou les parties d\'un mot coupé en fin de ligne.' },
];

// ─── Connectors for structure analysis ───────────────────────────────────────
const COORD_CONJ = ['mais','ou','et','donc','or','ni','car'];
const SUB_CONJ   = ['que','qu\'','qui','dont','où','quand','lorsque','comme','si','puisque','quoique','afin','lequel','laquelle','lesquels','lesquelles'];

// ─── Tokenizer ────────────────────────────────────────────────────────────────
// Returns [{type:'word'|'punct'|'space', value, index}]
export function tokenize(text) {
  const tokens = [];
  const re = /([a-zA-ZÀ-ÿ'-]+)|([,;:!?…«»—\-.])|(\s+)/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m[1]) tokens.push({ type: 'word',  value: m[1], index: m.index });
    else if (m[2]) tokens.push({ type: 'punct', value: m[2], index: m.index });
    else if (m[3]) tokens.push({ type: 'space', value: m[3], index: m.index });
  }
  return tokens;
}

// ─── Analysis functions ───────────────────────────────────────────────────────

export function detectVerbs(text) {
  const tokens = tokenize(text);
  const results = [];
  tokens.forEach((tok, i) => {
    if (tok.type !== 'word') return;
    const lower = tok.value.toLowerCase();
    if (VERB_FORMS[lower]) {
      results.push({ word: tok.value, lower, ...VERB_FORMS[lower], tokenIdx: i });
    }
  });
  return results;
}

function catForWord(lower) {
  for (const [key, cat] of Object.entries(GRAMMAR_CATS)) {
    if (cat.words.has(lower)) return { key, ...cat };
  }
  return null;
}

export function detectGrammar(text) {
  const tokens = tokenize(text);
  const results = [];
  tokens.forEach((tok, i) => {
    if (tok.type !== 'word') return;
    const lower = tok.value.toLowerCase();
    const cat = catForWord(lower);
    if (cat) results.push({ word: tok.value, lower, cat, tokenIdx: i });
  });
  return results;
}

export function detectPunctuation(text) {
  const results = [];
  const tokens = tokenize(text);
  const seen = new Set();
  tokens.forEach((tok, i) => {
    if (tok.type !== 'punct') return;
    const rule = PUNCT_RULES.find(r => r.char === tok.value);
    if (!rule) return;
    // context: up to 3 words before and 3 after
    const ctx = tokens.slice(Math.max(0, i - 5), Math.min(tokens.length, i + 6))
      .map(t => t.value).join('');
    results.push({ char: tok.value, rule, context: ctx, tokenIdx: i });
  });
  return results;
}

export function detectStructure(text) {
  // Split into raw sentences
  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  const allTokens = tokenize(text);

  // Find connectors and label them
  const connectors = [];
  allTokens.forEach((tok, i) => {
    if (tok.type !== 'word') return;
    const lower = tok.value.toLowerCase();
    if (COORD_CONJ.includes(lower)) {
      connectors.push({ word: tok.value, type: 'coordination', tokenIdx: i,
        expl: `« ${tok.value} » : conjonction de coordination. Relie deux propositions de même rang grammatical.` });
    } else if (SUB_CONJ.includes(lower)) {
      const next = allTokens.slice(i + 1).find(t => t.type === 'word');
      connectors.push({ word: tok.value, type: 'subordination', tokenIdx: i,
        expl: `« ${tok.value} » introduit une proposition subordonnée${lower === 'qui' || lower === 'que' || lower === 'dont' || lower === 'où' ? ' relative' : ''}.` });
    }
  });

  // Count propositions (rough: count subject-verb pairs indicated by connectors)
  const relCount  = allTokens.filter(t => t.type === 'word' && ['qui','que','dont','où'].includes(t.value.toLowerCase())).length;
  const coordCount = connectors.filter(c => c.type === 'coordination').length;

  return {
    sentences,
    connectors,
    relCount,
    coordCount,
    sentenceCount: sentences.length,
  };
}

// ─── Highlighted token builder ─────────────────────────────────────────────────
// Returns tokens with .highlight = {color, label} | null
export function buildHighlightedTokens(text, tab, analysis) {
  const tokens = tokenize(text);
  const verbIdxs     = new Set((analysis.verbs   || []).map(v => v.tokenIdx));
  const grammarMap   = new Map((analysis.grammar  || []).map(g => [g.tokenIdx, g]));
  const punctIdxs    = new Set((analysis.punct    || []).map(p => p.tokenIdx));
  const connectorIdxs= new Set((analysis.structure?.connectors || []).map(c => c.tokenIdx));

  return tokens.map((tok, i) => {
    let highlight = null;
    if (tab === 'conjugaison' && tok.type === 'word' && verbIdxs.has(i)) {
      highlight = { color: '#d97706', bg: 'rgba(217,119,6,.15)', label: 'verbe' };
    } else if (tab === 'grammaire' && tok.type === 'word' && grammarMap.has(i)) {
      const g = grammarMap.get(i);
      highlight = { color: g.cat.color, bg: g.cat.color + '22', label: g.cat.label };
    } else if (tab === 'ponctuation' && tok.type === 'punct' && punctIdxs.has(i)) {
      const rule = PUNCT_RULES.find(r => r.char === tok.value);
      if (rule) highlight = { color: rule.color, bg: rule.color + '25', label: rule.name };
    } else if (tab === 'structure' && tok.type === 'word' && connectorIdxs.has(i)) {
      const c = analysis.structure.connectors.find(x => x.tokenIdx === i);
      highlight = {
        color: c.type === 'coordination' ? '#d97706' : '#7c3aed',
        bg: c.type === 'coordination' ? 'rgba(217,119,6,.18)' : 'rgba(124,58,237,.15)',
        label: c.type === 'coordination' ? 'coordination' : 'subordination',
      };
    }
    return { ...tok, highlight };
  });
}
