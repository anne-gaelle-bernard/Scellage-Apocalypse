// Texte de l'Apocalypse - Version Louis Segond 1910 (domaine public)

const APOCALYPSE_LSG = {
  titre: "L'Apocalypse de Jean",
  chapitres: [
    {
      numero: 1,
      titre: "Vision du Fils de l'homme",
      theme: "Introduction et vision inaugurale",
      versets: [
        { n: 1, t: "Révélation de Jésus-Christ, que Dieu lui a donnée pour montrer à ses serviteurs les choses qui doivent arriver bientôt. Il l'a fait connaître, par l'envoi de son ange, à son serviteur Jean," },
        { n: 2, t: "qui a attesté la parole de Dieu et le témoignage de Jésus-Christ, tout ce qu'il a vu." },
        { n: 3, t: "Heureux celui qui lit et ceux qui entendent les paroles de la prophétie, et qui gardent les choses qui y sont écrites! Car le temps est proche." },
        { n: 4, t: "Jean, aux sept Eglises qui sont en Asie: que la grâce et la paix vous soient données de la part de celui qui est, qui était, et qui vient, et de la part des sept esprits qui sont devant son trône," },
        { n: 5, t: "et de la part de Jésus-Christ, le témoin fidèle, le premier-né des morts, et le prince des rois de la terre! A celui qui nous aime, qui nous a délivrés de nos péchés par son sang," },
        { n: 6, t: "et qui a fait de nous un royaume, des sacrificateurs pour Dieu son Père, à lui soient la gloire et la puissance, aux siècles des siècles! Amen!" },
        { n: 7, t: "Voici, il vient avec les nuées. Et tout oeil le verra, même ceux qui l'ont percé; et toutes les tribus de la terre se lamenteront à cause de lui. Oui. Amen!" },
        { n: 8, t: "Je suis l'alpha et l'oméga, dit le Seigneur Dieu, celui qui est, qui était, et qui vient, le Tout-Puissant." },
        { n: 9, t: "Moi Jean, votre frère, et qui ai part avec vous à la tribulation et au royaume et à la persévérance en Jésus, j'étais dans l'île appelée Patmos, à cause de la parole de Dieu et du témoignage de Jésus." },
        { n: 10, t: "Je fus ravi en esprit au jour du Seigneur, et j'entendis derrière moi une voix forte, comme le son d'une trompette," },
        { n: 11, t: "qui disait: Ce que tu vois, écris-le dans un livre, et envoie-le aux sept Eglises, à Ephèse, à Smyrne, à Pergame, à Thyatire, à Sardes, à Philadelphie, et à Laodicée." },
        { n: 12, t: "Je me retournai pour connaître quelle était la voix qui me parlait. Et, après m'être retourné, je vis sept chandeliers d'or," },
        { n: 13, t: "et, au milieu des sept chandeliers, quelqu'un qui ressemblait à un fils d'homme, vêtu d'une longue robe, et ayant une ceinture d'or à la hauteur de la poitrine." },
        { n: 14, t: "Sa tête et ses cheveux étaient blancs comme de la laine blanche, comme de la neige; ses yeux étaient comme une flamme de feu;" },
        { n: 15, t: "ses pieds étaient semblables à de l'airain ardent, comme s'il eût été embrasé dans une fournaise; et sa voix était comme le bruit de grandes eaux." },
        { n: 16, t: "Il avait dans sa main droite sept étoiles. De sa bouche sortait une épée aiguë, à deux tranchants. Et son visage était comme le soleil lorsqu'il brille dans sa force." },
        { n: 17, t: "Quand je le vis, je tombai à ses pieds comme mort. Il posa sur moi sa main droite en disant: Ne crains pas! Je suis le premier et le dernier," },
        { n: 18, t: "et le vivant. J'étais mort; et voici, je suis vivant aux siècles des siècles. Je tiens les clefs de la mort et du séjour des morts." },
        { n: 19, t: "Ecris donc les choses que tu as vues, et celles qui sont, et celles qui doivent arriver après elles," },
        { n: 20, t: "le mystère des sept étoiles que tu as vues dans ma main droite, et des sept chandeliers d'or. Les sept étoiles sont les anges des sept Eglises, et les sept chandeliers sont les sept Eglises." }
      ]
    },
    {
      numero: 2,
      titre: "Lettres aux Eglises d'Ephèse, Smyrne, Pergame et Thyatire",
      theme: "Les quatre premières lettres",
      versets: [
        { n: 1, t: "Ecris à l'ange de l'Eglise d'Ephèse: Voici ce que dit celui qui tient les sept étoiles dans sa main droite, celui qui marche au milieu des sept chandeliers d'or:" },
        { n: 2, t: "Je connais tes oeuvres, ton travail, et ta persévérance. Je sais que tu ne peux pas supporter les méchants; que tu as éprouvé ceux qui se disent apôtres et qui ne le sont pas, et que tu les as trouvés menteurs;" },
        { n: 3, t: "que tu as de la persévérance, que tu as souffert à cause de mon nom, et que tu ne t'es pas lassé." },
        { n: 4, t: "Mais ce que j'ai contre toi, c'est que tu as abandonné ton premier amour." },
        { n: 5, t: "Souviens-toi donc d'où tu es tombé, repens-toi, et pratique tes premières oeuvres; sinon, je viendrai à toi, et j'ôterai ton chandelier de sa place, à moins que tu ne te repentes." },
        { n: 6, t: "Tu as pourtant ceci, c'est que tu hais les oeuvres des Nicolaïtes, oeuvres que je hais aussi." },
        { n: 7, t: "Que celui qui a des oreilles entende ce que l'Esprit dit aux Eglises. A celui qui vaincra je donnerai à manger de l'arbre de vie, qui est dans le paradis de Dieu." },
        { n: 8, t: "Ecris à l'ange de l'Eglise de Smyrne: Voici ce que dit le premier et le dernier, celui qui était mort, et qui est revenu à la vie:" },
        { n: 9, t: "Je connais ta tribulation et ta pauvreté (bien que tu sois riche), et les calomnies de la part de ceux qui se disent Juifs et ne le sont pas, mais qui sont une synagogue de Satan." },
        { n: 10, t: "Ne crains pas ce que tu vas souffrir. Voici, le diable jettera quelques-uns de vous en prison, afin que vous soyez éprouvés, et vous aurez une tribulation de dix jours. Sois fidèle jusqu'à la mort, et je te donnerai la couronne de vie." },
        { n: 11, t: "Que celui qui a des oreilles entende ce que l'Esprit dit aux Eglises. Celui qui vaincra n'aura pas à souffrir la seconde mort." },
        { n: 12, t: "Ecris à l'ange de l'Eglise de Pergame: Voici ce que dit celui qui a l'épée aiguë, à deux tranchants:" },
        { n: 13, t: "Je sais où tu demeures: c'est là où est le trône de Satan. Tu retiens mon nom, et tu n'as pas renié ma foi, même aux jours d'Antipas, mon témoin fidèle, qui a été mis à mort chez vous, là où Satan habite." },
        { n: 14, t: "Mais j'ai quelques choses contre toi: tu as là des gens attachés à la doctrine de Balaam, qui enseignait à Balak à mettre une pierre d'achoppement devant les fils d'Israël, pour qu'ils mangeassent des viandes sacrifiées aux idoles et qu'ils se livrassent à l'impudicité." },
        { n: 15, t: "De même, toi aussi, tu as des gens attachés à la doctrine des Nicolaïtes." },
        { n: 16, t: "Repens-toi donc; sinon, je viendrai à toi bientôt, et je les combattrai avec l'épée de ma bouche." },
        { n: 17, t: "Que celui qui a des oreilles entende ce que l'Esprit dit aux Eglises. A celui qui vaincra je donnerai de la manne cachée, et je lui donnerai un caillou blanc; et sur ce caillou est écrit un nom nouveau, que personne ne connaît, si ce n'est celui qui le reçoit." },
        { n: 18, t: "Ecris à l'ange de l'Eglise de Thyatire: Voici ce que dit le Fils de Dieu, celui qui a les yeux comme une flamme de feu, et dont les pieds sont semblables à de l'airain ardent:" },
        { n: 19, t: "Je connais tes oeuvres, ton amour, ta foi, ton service, ta persévérance, et tes dernières oeuvres plus nombreuses que les premières." },
        { n: 20, t: "Mais ce que j'ai contre toi, c'est que tu laisses la femme Jézabel, qui se dit prophétesse, enseigner et séduire mes serviteurs, pour qu'ils se livrent à l'impudicité et qu'ils mangent des viandes sacrifiées aux idoles." },
        { n: 21, t: "Je lui ai donné du temps pour qu'elle se repentît, et elle ne veut pas se repentir de son impudicité." },
        { n: 22, t: "Voici, je vais la jeter sur un lit, et envoyer une grande tribulation à ceux qui commettent adultère avec elle, à moins qu'ils ne se repentent de leurs oeuvres." },
        { n: 23, t: "Je ferai mourir de mort ses enfants; et toutes les Eglises connaîtront que je suis celui qui sonde les reins et les coeurs, et je vous rendrai à chacun selon vos oeuvres." },
        { n: 24, t: "A vous, et à tous les autres de Thyatire, qui ne reçoivent pas cette doctrine et n'ont pas connu les profondeurs de Satan, comme ils les appellent, je vous dis: Je ne mets pas sur vous d'autre fardeau;" },
        { n: 25, t: "seulement, ce que vous avez, retenez-le jusqu'à ce que je vienne." },
        { n: 26, t: "A celui qui vaincra, et qui gardera mes oeuvres jusqu'à la fin, je donnerai autorité sur les nations." },
        { n: 27, t: "Il les paîtra avec une verge de fer, comme on brise les vases d'argile, ainsi que moi-même j'en ai reçu le pouvoir de mon Père." },
        { n: 28, t: "Et je lui donnerai l'étoile du matin." },
        { n: 29, t: "Que celui qui a des oreilles entende ce que l'Esprit dit aux Eglises." }
      ]
    },
    {
      numero: 3,
      titre: "Lettres aux Eglises de Sardes, Philadelphie et Laodicée",
      theme: "Les trois dernières lettres",
      versets: [
        { n: 1, t: "Ecris à l'ange de l'Eglise de Sardes: Voici ce que dit celui qui a les sept esprits de Dieu et les sept étoiles: Je connais tes oeuvres. Je sais que tu passes pour être vivant, et tu es mort." },
        { n: 2, t: "Sois vigilant, et affermis le reste qui est près de mourir; car je n'ai pas trouvé tes oeuvres parfaites devant mon Dieu." },
        { n: 3, t: "Rappelle-toi donc comment tu as reçu et entendu, et garde et repens-toi. Si tu ne veilles pas, je viendrai comme un voleur, et tu ne sauras pas à quelle heure je viendrai sur toi." },
        { n: 4, t: "Cependant tu as à Sardes quelques hommes qui n'ont pas souillé leurs vêtements; ils marcheront avec moi en vêtements blancs, parce qu'ils en sont dignes." },
        { n: 5, t: "Celui qui vaincra sera revêtu ainsi de vêtements blancs; je n'effacerai point son nom du livre de vie, et je confesserai son nom devant mon Père et devant ses anges." },
        { n: 6, t: "Que celui qui a des oreilles entende ce que l'Esprit dit aux Eglises." },
        { n: 7, t: "Ecris à l'ange de l'Eglise de Philadelphie: Voici ce que dit le Saint, le Véritable, celui qui a la clef de David, celui qui ouvre, et personne ne fermera, celui qui ferme, et personne n'ouvrira:" },
        { n: 8, t: "Je connais tes oeuvres. Voici, j'ai mis devant toi une porte ouverte, que personne ne peut fermer, car tu as peu de puissance, et tu as gardé ma parole, et tu n'as pas renié mon nom." },
        { n: 9, t: "Voici, je te donne de ceux de la synagogue de Satan, qui se disent Juifs et ne le sont pas, mais qui mentent; voici, je les ferai venir se prosterner à tes pieds, et ils sauront que je t'ai aimé." },
        { n: 10, t: "Parce que tu as gardé la parole de ma persévérance, je te garderai aussi à l'heure de la tentation qui va venir sur le monde entier, pour éprouver les habitants de la terre." },
        { n: 11, t: "Je viens bientôt. Retiens ce que tu as, afin que personne ne prenne ta couronne." },
        { n: 12, t: "Celui qui vaincra, je ferai de lui une colonne dans le temple de mon Dieu, et il n'en sortira plus; j'écrirai sur lui le nom de mon Dieu, et le nom de la ville de mon Dieu, de la nouvelle Jérusalem qui descend du ciel d'auprès de mon Dieu, et mon nom nouveau." },
        { n: 13, t: "Que celui qui a des oreilles entende ce que l'Esprit dit aux Eglises." },
        { n: 14, t: "Ecris à l'ange de l'Eglise de Laodicée: Voici ce que dit l'Amen, le témoin fidèle et véritable, le commencement de la création de Dieu:" },
        { n: 15, t: "Je connais tes oeuvres. Je sais que tu n'es ni froid ni bouillant. Puisses-tu être froid ou bouillant!" },
        { n: 16, t: "Ainsi, parce que tu es tiède, et que tu n'es ni froid ni bouillant, je te vomirai de ma bouche." },
        { n: 17, t: "Parce que tu dis: Je suis riche, je me suis enrichi, et je n'ai besoin de rien, et parce que tu ne sais pas que tu es malheureux, misérable, pauvre, aveugle et nu," },
        { n: 18, t: "je te conseille d'acheter de moi de l'or éprouvé par le feu, afin que tu deviennes riche, et des vêtements blancs, afin que tu sois vêtu et que la honte de ta nudité ne paraisse pas, et un collyre pour oindre tes yeux, afin que tu voies." },
        { n: 19, t: "Moi, je reprends et je châtie tous ceux que j'aime. Aie donc du zèle, et repens-toi." },
        { n: 20, t: "Voici, je me tiens à la porte, et je frappe. Si quelqu'un entend ma voix et ouvre la porte, j'entrerai chez lui, je souperai avec lui, et lui avec moi." },
        { n: 21, t: "Celui qui vaincra, je lui donnerai de s'asseoir avec moi sur mon trône, comme moi j'ai vaincu et me suis assis avec mon Père sur son trône." },
        { n: 22, t: "Que celui qui a des oreilles entende ce que l'Esprit dit aux Eglises." }
      ]
    },
    {
      numero: 4,
      titre: "Le trône de Dieu dans le ciel",
      theme: "Vision céleste et adoration",
      versets: [
        { n: 1, t: "Après cela, je regardai, et voici, une porte était ouverte dans le ciel. La première voix que j'avais entendue, comme le son d'une trompette, me parla et dit: Monte ici, et je te ferai voir ce qui doit arriver après ces choses." },
        { n: 2, t: "Aussitôt je fus ravi en esprit. Et voici, il y avait un trône dans le ciel, et sur ce trône quelqu'un était assis." },
        { n: 3, t: "Celui qui était assis avait l'aspect d'une pierre de jaspe et de sardoine; et le trône était environné d'un arc-en-ciel semblable à de l'émeraude." },
        { n: 4, t: "Autour du trône étaient vingt-quatre trônes, sur lesquels étaient assis vingt-quatre anciens revêtus de vêtements blancs, et qui avaient sur leurs têtes des couronnes d'or." },
        { n: 5, t: "Du trône sortaient des éclairs, des voix et des tonnerres. Devant le trône brûlaient sept lampes de feu, qui sont les sept esprits de Dieu." },
        { n: 6, t: "Il y avait aussi devant le trône comme une mer de verre, semblable à du cristal. Au milieu du trône et autour du trône, il y avait quatre êtres vivants remplis d'yeux devant et derrière." },
        { n: 7, t: "Le premier être vivant était semblable à un lion, le deuxième être vivant était semblable à un veau, le troisième être vivant avait la face comme un homme, et le quatrième être vivant était semblable à un aigle qui vole." },
        { n: 8, t: "Les quatre êtres vivants avaient chacun six ailes, et ils étaient remplis d'yeux tout autour et en dedans. Ils ne cessaient de dire jour et nuit: Saint, saint, saint est le Seigneur Dieu, le Tout-Puissant, qui était, qui est, et qui vient!" },
        { n: 9, t: "Quand les êtres vivants rendaient gloire et honneur et actions de grâces à celui qui est assis sur le trône, à celui qui vit aux siècles des siècles," },
        { n: 10, t: "les vingt-quatre anciens se prosternaient devant celui qui est assis sur le trône, et ils adoraient celui qui vit aux siècles des siècles, et ils jetaient leurs couronnes devant le trône, en disant:" },
        { n: 11, t: "Tu es digne, Seigneur notre Dieu, de recevoir la gloire et l'honneur et la puissance; car tu as créé toutes choses, et c'est par ta volonté qu'elles existent et qu'elles ont été créées." }
      ]
    },
    {
      numero: 5,
      titre: "Le livre aux sept sceaux et l'Agneau",
      theme: "L'Agneau prend le livre aux sept sceaux",
      versets: [
        { n: 1, t: "Et je vis dans la main droite de celui qui était assis sur le trône un livre écrit en dedans et en dehors, scellé de sept sceaux." },
        { n: 2, t: "Et je vis un ange puissant, qui criait d'une voix forte: Qui est digne d'ouvrir le livre et d'en rompre les sceaux?" },
        { n: 3, t: "Et personne dans le ciel, ni sur la terre, ni sous la terre, ne pouvait ouvrir le livre ni le regarder." },
        { n: 4, t: "Je pleurai beaucoup de ce que personne n'était trouvé digne d'ouvrir le livre et de le lire." },
        { n: 5, t: "Et l'un des anciens me dit: Ne pleure pas; voici, le lion de la tribu de Juda, le rejeton de David, a vaincu pour ouvrir le livre et ses sept sceaux." },
        { n: 6, t: "Et je vis, au milieu du trône et des quatre êtres vivants et au milieu des anciens, un agneau qui était là comme immolé, ayant sept cornes et sept yeux, qui sont les sept esprits de Dieu envoyés par toute la terre." },
        { n: 7, t: "Il vint, et il prit le livre de la main droite de celui qui était assis sur le trône." },
        { n: 8, t: "Quand il eut pris le livre, les quatre êtres vivants et les vingt-quatre anciens se prosternèrent devant l'agneau, tenant chacun une harpe et des coupes d'or remplies de parfums, qui sont les prières des saints." },
        { n: 9, t: "Ils chantaient un cantique nouveau, en disant: Tu es digne de prendre le livre et d'en ouvrir les sceaux; car tu as été immolé, et tu as racheté pour Dieu par ton sang des hommes de toute tribu, de toute langue, de tout peuple, et de toute nation;" },
        { n: 10, t: "tu as fait d'eux un royaume et des sacrificateurs pour notre Dieu, et ils régneront sur la terre." },
        { n: 11, t: "Et je regardai, et j'entendis la voix de beaucoup d'anges autour du trône et des êtres vivants et des anciens, et leur nombre était des myriades de myriades et des milliers de milliers," },
        { n: 12, t: "qui disaient d'une voix forte: L'agneau qui a été immolé est digne de recevoir la puissance, la richesse, la sagesse, la force, l'honneur, la gloire, et la louange." },
        { n: 13, t: "Et j'entendis toutes les créatures qui sont dans le ciel, sur la terre, sous la terre, sur la mer, et tout ce qui s'y trouve, disant: A celui qui est assis sur le trône et à l'agneau soient la louange, l'honneur, la gloire, et la puissance, aux siècles des siècles!" },
        { n: 14, t: "Et les quatre êtres vivants disaient: Amen! Et les vingt-quatre anciens se prosternèrent et adorèrent." }
      ]
    },
    {
      numero: 6,
      titre: "L'ouverture des six premiers sceaux",
      theme: "Les quatre cavaliers et les âmes des martyrs",
      versets: [
        { n: 1, t: "Je regardai, quand l'agneau ouvrit un des sept sceaux, et j'entendis l'un des quatre êtres vivants dire comme d'une voix de tonnerre: Viens." },
        { n: 2, t: "Je regardai, et voici, parut un cheval blanc. Celui qui le montait avait un arc; une couronne lui fut donnée, et il sortit en vainqueur et pour vaincre." },
        { n: 3, t: "Quand il ouvrit le deuxième sceau, j'entendis le deuxième être vivant dire: Viens." },
        { n: 4, t: "Et il sortit un autre cheval, rouge comme le feu. Celui qui le montait reçut le pouvoir d'ôter la paix de la terre, afin que les hommes s'égorgeassent les uns les autres; et une grande épée lui fut donnée." },
        { n: 5, t: "Quand il ouvrit le troisième sceau, j'entendis le troisième être vivant dire: Viens. Je regardai, et voici, parut un cheval noir. Celui qui le montait tenait une balance dans sa main." },
        { n: 6, t: "Et j'entendis au milieu des quatre êtres vivants une voix qui disait: Une mesure de blé pour un denier, et trois mesures d'orge pour un denier; mais ne fais point de mal à l'huile et au vin." },
        { n: 7, t: "Quand il ouvrit le quatrième sceau, j'entendis la voix du quatrième être vivant dire: Viens." },
        { n: 8, t: "Je regardai, et voici, parut un cheval d'une couleur pâle. Celui qui le montait se nommait la Mort, et le séjour des morts l'accompagnait. Le pouvoir leur fut donné sur le quart de la terre, pour faire périr les hommes par l'épée, par la famine, par la mortalité, et par les bêtes sauvages de la terre." },
        { n: 9, t: "Quand il ouvrit le cinquième sceau, je vis sous l'autel les âmes de ceux qui avaient été immolés à cause de la parole de Dieu et à cause du témoignage qu'ils avaient rendu." },
        { n: 10, t: "Ils crièrent d'une voix forte, en disant: Jusques à quand, Maître saint et véritable, tardes-tu à juger et à venger notre sang sur les habitants de la terre?" },
        { n: 11, t: "Une robe blanche fut donnée à chacun d'eux; et il leur fut dit de se tenir en repos encore un peu de temps, jusqu'à ce que fût complet le nombre de leurs compagnons de service et de leurs frères qui devaient être mis à mort comme eux." },
        { n: 12, t: "Je regardai, quand il ouvrit le sixième sceau; et il y eut un grand tremblement de terre, le soleil devint noir comme un sac de crin, la lune entière devint comme du sang," },
        { n: 13, t: "et les étoiles du ciel tombèrent sur la terre, comme un figuier secoué par un grand vent jette ses figues vertes." },
        { n: 14, t: "Le ciel se retira comme un livre qu'on roule; et toutes les montagnes et toutes les îles furent remuées de leurs places." },
        { n: 15, t: "Les rois de la terre, les grands, les chefs militaires, les riches, les puissants, et tous les esclaves et les hommes libres, se cachèrent dans les cavernes et dans les rochers des montagnes." },
        { n: 16, t: "Et ils dirent aux montagnes et aux rochers: Tombez sur nous et cachez-nous devant la face de celui qui est assis sur le trône et devant la colère de l'agneau;" },
        { n: 17, t: "car le grand jour de sa colère est venu, et qui peut subsister?" }
      ]
    },
    {
      numero: 7,
      titre: "Les cent quarante-quatre mille — La foule innombrable",
      theme: "Le sceau des serviteurs de Dieu",
      versets: [
        { n: 1, t: "Après cela, je vis quatre anges debout aux quatre coins de la terre; ils retenaient les quatre vents de la terre, afin qu'il ne soufflât point de vent sur la terre, ni sur la mer, ni sur aucun arbre." },
        { n: 2, t: "Et je vis un autre ange qui montait du côté du soleil levant, et qui tenait le sceau du Dieu vivant. Il cria d'une voix forte aux quatre anges à qui il avait été donné de faire du mal à la terre et à la mer," },
        { n: 3, t: "disant: Ne faites pas de mal à la terre, ni à la mer, ni aux arbres, jusqu'à ce que nous ayons marqué du sceau le front des serviteurs de notre Dieu." },
        { n: 4, t: "Et j'entendis le nombre de ceux qui avaient été marqués du sceau: cent quarante-quatre mille, de toutes les tribus des fils d'Israël." },
        { n: 5, t: "De la tribu de Juda, douze mille avaient été marqués du sceau; de la tribu de Ruben, douze mille; de la tribu de Gad, douze mille;" },
        { n: 6, t: "de la tribu d'Aser, douze mille; de la tribu de Nephthali, douze mille; de la tribu de Manassé, douze mille;" },
        { n: 7, t: "de la tribu de Siméon, douze mille; de la tribu de Lévi, douze mille; de la tribu d'Issacar, douze mille;" },
        { n: 8, t: "de la tribu de Zabulon, douze mille; de la tribu de Joseph, douze mille; de la tribu de Benjamin, douze mille avaient été marqués du sceau." },
        { n: 9, t: "Après cela, je regardai, et voici, il y avait une grande foule, que personne ne pouvait compter, de toute nation, de toute tribu, de tout peuple, et de toute langue. Ils se tenaient devant le trône et devant l'agneau, revêtus de robes blanches, et des palmes dans leurs mains." },
        { n: 10, t: "Et ils criaient d'une voix forte, en disant: Le salut est à notre Dieu qui est assis sur le trône, et à l'agneau." },
        { n: 11, t: "Et tous les anges se tenaient autour du trône et des anciens et des quatre êtres vivants; ils se prosternèrent sur leurs faces devant le trône, et ils adorèrent Dieu," },
        { n: 12, t: "en disant: Amen! La louange, la gloire, la sagesse, l'action de grâces, l'honneur, la puissance et la force soient à notre Dieu, aux siècles des siècles. Amen!" },
        { n: 13, t: "Et l'un des anciens prit la parole et me dit: Ceux qui sont revêtus de robes blanches, qui sont-ils, et d'où sont-ils venus?" },
        { n: 14, t: "Je lui dis: Mon seigneur, tu le sais. Et il me dit: Ce sont ceux qui viennent de la grande tribulation; ils ont lavé leurs robes, et ils les ont blanchies dans le sang de l'agneau." },
        { n: 15, t: "C'est pour cela qu'ils sont devant le trône de Dieu, et le servent jour et nuit dans son temple. Celui qui est assis sur le trône dressera sa tente sur eux;" },
        { n: 16, t: "ils n'auront plus faim, ils n'auront plus soif, et le soleil ne les frappera plus, ni aucune chaleur;" },
        { n: 17, t: "car l'agneau qui est au milieu du trône les paîtra et les conduira aux sources des eaux de la vie, et Dieu essuiera toute larme de leurs yeux." }
      ]
    },
    {
      numero: 8,
      titre: "Le septième sceau — Les sept anges aux trompettes",
      theme: "Les quatre premières trompettes",
      versets: [
        { n: 1, t: "Quand il ouvrit le septième sceau, il y eut dans le ciel un silence d'environ une demi-heure." },
        { n: 2, t: "Et je vis les sept anges qui se tiennent devant Dieu, et sept trompettes leur furent données." },
        { n: 3, t: "Et un autre ange vint, et il se tint près de l'autel, ayant un encensoir d'or; on lui donna beaucoup de parfums, afin qu'il les offre avec les prières de tous les saints sur l'autel d'or qui est devant le trône." },
        { n: 4, t: "La fumée des parfums monta, avec les prières des saints, de la main de l'ange devant Dieu." },
        { n: 5, t: "Et l'ange prit l'encensoir, le remplit du feu de l'autel, et le jeta sur la terre. Et il y eut des tonnerres, des voix, des éclairs, et un tremblement de terre." },
        { n: 6, t: "Et les sept anges qui avaient les sept trompettes se préparèrent à en sonner." },
        { n: 7, t: "Le premier sonna de la trompette. Et il y eut de la grêle et du feu mêlés de sang, qui furent jetés sur la terre; et le tiers de la terre fut brûlé, et le tiers des arbres fut brûlé, et toute herbe verte fut brûlée." },
        { n: 8, t: "Le deuxième ange sonna de la trompette. Et quelque chose comme une grande montagne ardente de feu fut jeté dans la mer; et le tiers de la mer devint du sang," },
        { n: 9, t: "et le tiers des créatures qui étaient dans la mer et qui avaient vie mourut, et le tiers des navires périt." },
        { n: 10, t: "Le troisième ange sonna de la trompette. Et il tomba du ciel une grande étoile ardente comme un flambeau; elle tomba sur le tiers des fleuves et sur les sources des eaux." },
        { n: 11, t: "Le nom de cette étoile est Absinthe; et le tiers des eaux devint de l'absinthe, et beaucoup d'hommes moururent par ces eaux, parce qu'elles étaient devenues amères." },
        { n: 12, t: "Le quatrième ange sonna de la trompette. Et le tiers du soleil fut frappé, et le tiers de la lune, et le tiers des étoiles, afin que le tiers en fût obscurci, et que le jour perdît un tiers de sa clarté, et la nuit de même." },
        { n: 13, t: "Et je regardai, et j'entendis un aigle qui volait au milieu du ciel, disant d'une voix forte: Malheur, malheur, malheur aux habitants de la terre, à cause des autres sons de trompette des trois anges qui doivent encore sonner!" }
      ]
    },
    {
      numero: 9,
      titre: "La cinquième et sixième trompette",
      theme: "Les sauterelles et les cavaliers infernaux",
      versets: [
        { n: 1, t: "Le cinquième ange sonna de la trompette. Et je vis une étoile qui était tombée du ciel sur la terre; la clef du puits de l'abîme lui fut donnée." },
        { n: 2, t: "Elle ouvrit le puits de l'abîme, et il monta du puits une fumée comme la fumée d'une grande fournaise; et le soleil et l'air furent obscurcis par la fumée du puits." },
        { n: 3, t: "De cette fumée sortirent des sauterelles qui se répandirent sur la terre, et il leur fut donné un pouvoir comme le pouvoir qu'ont les scorpions de la terre." },
        { n: 4, t: "Il leur fut dit de ne pas faire de mal à l'herbe de la terre, ni à aucune verdure, ni à aucun arbre, mais seulement aux hommes qui n'ont pas le sceau de Dieu sur le front." },
        { n: 5, t: "Il leur fut donné, non de les tuer, mais de les tourmenter pendant cinq mois; et le tourment qu'elles causaient était comme le tourment causé par le scorpion quand il pique un homme." },
        { n: 6, t: "En ces jours-là, les hommes chercheront la mort, et ils ne la trouveront pas; ils désireront mourir, et la mort fuira loin d'eux." },
        { n: 7, t: "Les sauterelles ressemblaient à des chevaux préparés pour le combat; il y avait sur leurs têtes comme des couronnes semblables à de l'or, et leurs faces étaient comme des faces d'hommes;" },
        { n: 8, t: "elles avaient des cheveux comme les cheveux des femmes, et leurs dents étaient comme des dents de lions;" },
        { n: 9, t: "elles avaient des cuirasses comme des cuirasses de fer, et le bruit de leurs ailes était comme le bruit de chars à plusieurs chevaux qui courent au combat;" },
        { n: 10, t: "elles avaient des queues semblables à celles des scorpions et des aiguillons; et c'est dans leurs queues qu'était le pouvoir de faire du mal aux hommes pendant cinq mois." },
        { n: 11, t: "Elles avaient sur elles comme roi l'ange de l'abîme, qui s'appelle en hébreu Abaddon, et en grec Apollyon." },
        { n: 12, t: "Le premier malheur est passé. Voici, il vient encore deux malheurs après ces choses." },
        { n: 13, t: "Le sixième ange sonna de la trompette. Et j'entendis une voix venant des quatre cornes de l'autel d'or qui est devant Dieu," },
        { n: 14, t: "et disant au sixième ange qui avait la trompette: Délie les quatre anges qui sont liés au grand fleuve d'Euphrate." },
        { n: 15, t: "Et les quatre anges, qui étaient prêts pour l'heure, pour le jour, pour le mois et pour l'année, furent déliés afin de tuer le tiers des hommes." },
        { n: 16, t: "Le nombre des troupes de cavalerie était deux myriades de myriades; j'en entendis le nombre." },
        { n: 17, t: "Et ainsi dans la vision je vis les chevaux et ceux qui les montaient, ayant des cuirasses de feu, d'hyacinthe et de soufre; les têtes des chevaux étaient comme des têtes de lions, et de leurs bouches sortaient du feu, de la fumée et du soufre." },
        { n: 18, t: "Le tiers des hommes fut tué par ces trois fléaux, par le feu, par la fumée et par le soufre qui sortaient de leurs bouches." },
        { n: 19, t: "Car le pouvoir des chevaux est dans leurs bouches et dans leurs queues; leurs queues sont semblables à des serpents, ayant des têtes, et c'est avec elles qu'ils font du mal." },
        { n: 20, t: "Les autres hommes qui ne furent pas tués par ces fléaux ne se repentirent pas des oeuvres de leurs mains; ils ne cessèrent pas de rendre un culte aux démons et aux idoles d'or, d'argent, d'airain, de pierre et de bois, qui ne peuvent ni voir, ni entendre, ni marcher;" },
        { n: 21, t: "et ils ne se repentirent pas de leurs meurtres, ni de leurs enchantements, ni de leur impudicité, ni de leurs vols." }
      ]
    },
    {
      numero: 10,
      titre: "L'ange au petit livre",
      theme: "Le livre ouvert et les sept tonnerres",
      versets: [
        { n: 1, t: "Et je vis un autre ange puissant qui descendait du ciel, enveloppé d'une nuée; au-dessus de sa tête était l'arc-en-ciel, et sa face était comme le soleil, et ses pieds comme des colonnes de feu." },
        { n: 2, t: "Il tenait dans sa main un petit livre ouvert. Il posa son pied droit sur la mer, et son pied gauche sur la terre;" },
        { n: 3, t: "et il cria d'une voix forte, comme rugit un lion. Quand il cria, les sept tonnerres firent entendre leurs voix." },
        { n: 4, t: "Lorsque les sept tonnerres eurent parlé, j'allais écrire; et j'entendis une voix du ciel qui disait: Scelle les choses que les sept tonnerres ont dites, et ne les écris pas." },
        { n: 5, t: "Et l'ange que je voyais debout sur la mer et sur la terre leva la main droite vers le ciel," },
        { n: 6, t: "et jura par celui qui vit aux siècles des siècles, qui a créé le ciel et les choses qui y sont, la terre et les choses qui y sont, et la mer et les choses qui y sont, qu'il n'y aurait plus de délai," },
        { n: 7, t: "mais qu'aux jours où le septième ange ferait entendre sa voix et sonnerait de la trompette, le mystère de Dieu s'accomplirait, selon la bonne nouvelle qu'il en a donnée à ses serviteurs les prophètes." },
        { n: 8, t: "Et la voix que j'avais entendue du ciel me parla de nouveau, et dit: Va, prends le livre ouvert dans la main de l'ange qui est debout sur la mer et sur la terre." },
        { n: 9, t: "Et j'allai vers l'ange, en lui disant de me donner le petit livre. Et il me dit: Prends-le, et avale-le; il sera amer à ton ventre, mais dans ta bouche il sera doux comme du miel." },
        { n: 10, t: "Je pris le petit livre de la main de l'ange, et je l'avalai; il était dans ma bouche doux comme du miel, mais quand je l'eus avalé, mon ventre fut rempli d'amertume." },
        { n: 11, t: "Et on me dit: Il faut que tu prophétises de nouveau sur beaucoup de peuples, de nations, de langues et de rois." }
      ]
    },
    {
      numero: 11,
      titre: "Les deux témoins — La septième trompette",
      theme: "Le temple mesuré et la septième trompette",
      versets: [
        { n: 1, t: "On me donna un roseau semblable à une verge, en disant: Lève-toi, et mesure le temple de Dieu, l'autel, et ceux qui y adorent." },
        { n: 2, t: "Mais le parvis extérieur du temple, laisse-le de côté, et ne le mesure pas, car il a été donné aux nations; et elles fouleront aux pieds la ville sainte pendant quarante-deux mois." },
        { n: 3, t: "Et je donnerai à mes deux témoins le pouvoir de prophétiser, vêtus de sacs, pendant mille deux cent soixante jours." },
        { n: 4, t: "Ce sont les deux oliviers et les deux chandeliers qui se tiennent devant le Seigneur de la terre." },
        { n: 5, t: "Si quelqu'un veut leur faire du mal, un feu sort de leur bouche et dévore leurs ennemis; et si quelqu'un veut leur faire du mal, il faut qu'il soit tué de cette manière." },
        { n: 6, t: "Ils ont le pouvoir de fermer le ciel, afin qu'il ne tombe pas de pluie pendant les jours de leur prophétie; et ils ont le pouvoir de changer les eaux en sang, et de frapper la terre de toute sorte de plaies, aussi souvent qu'ils le voudront." },
        { n: 7, t: "Quand ils auront achevé leur témoignage, la bête qui monte de l'abîme leur fera la guerre, les vaincra et les tuera." },
        { n: 8, t: "Leurs cadavres seront sur la place de la grande ville qui est appelée, dans un sens figuré, Sodome et Egypte, là où aussi leur Seigneur a été crucifié." },
        { n: 9, t: "Des hommes de tous peuples, tribus, langues et nations verront leurs cadavres pendant trois jours et demi, et ils ne permettront pas que leurs cadavres soient mis dans un sépulcre." },
        { n: 10, t: "Et les habitants de la terre se réjouiront à leur sujet et feront des réjouissances, et ils s'enverront des présents les uns aux autres, parce que ces deux prophètes ont tourmenté les habitants de la terre." },
        { n: 11, t: "Après les trois jours et demi, un esprit de vie venant de Dieu entra en eux, et ils se dressèrent sur leurs pieds; et une grande crainte s'empara de ceux qui les voyaient." },
        { n: 12, t: "Et ils entendirent du ciel une voix forte qui leur disait: Montez ici. Et ils montèrent au ciel dans la nuée; et leurs ennemis les virent." },
        { n: 13, t: "A cette heure-là, il y eut un grand tremblement de terre, et la dixième partie de la ville tomba; sept mille personnes furent tuées dans ce tremblement de terre, et les autres furent dans la terreur et donnèrent gloire au Dieu du ciel." },
        { n: 14, t: "Le deuxième malheur est passé. Voici, le troisième malheur vient bientôt." },
        { n: 15, t: "Le septième ange sonna de la trompette. Et il y eut dans le ciel de grandes voix qui disaient: Le royaume du monde est remis à notre Seigneur et à son Christ; et il régnera aux siècles des siècles." },
        { n: 16, t: "Et les vingt-quatre anciens, qui sont assis sur leurs trônes devant Dieu, se prosternèrent sur leurs faces et adorèrent Dieu," },
        { n: 17, t: "en disant: Nous te rendons grâces, Seigneur Dieu tout-puissant, qui es et qui étais, de ce que tu as saisi ta grande puissance et que tu as commencé à régner." },
        { n: 18, t: "Les nations se sont irritées; et ta colère est venue, et le temps des morts, afin qu'ils soient jugés, et le temps de donner leur récompense à tes serviteurs les prophètes, aux saints et à ceux qui craignent ton nom, petits et grands, et de détruire ceux qui détruisent la terre." },
        { n: 19, t: "Et le temple de Dieu qui est dans le ciel fut ouvert, et l'arche de son alliance parut dans son temple; et il y eut des éclairs, des voix, des tonnerres, un tremblement de terre, et une grosse grêle." }
      ]
    },
    {
      numero: 12,
      titre: "La femme, l'enfant et le dragon",
      theme: "Guerre dans le ciel — Satan chassé",
      versets: [
        { n: 1, t: "Un grand signe parut dans le ciel: une femme revêtue du soleil, ayant la lune sous ses pieds, et une couronne de douze étoiles sur sa tête." },
        { n: 2, t: "Elle était enceinte et criait, étant en travail et dans les douleurs de l'enfantement." },
        { n: 3, t: "Un autre signe parut dans le ciel; et voici, c'était un grand dragon rouge, ayant sept têtes et dix cornes, et sur ses têtes sept diadèmes." },
        { n: 4, t: "Sa queue entraîna le tiers des étoiles du ciel, et les jeta sur la terre. Le dragon se tint devant la femme qui allait enfanter, afin de dévorer son enfant, lorsqu'elle aurait enfanté." },
        { n: 5, t: "Elle enfanta un fils, qui doit paître toutes les nations avec une verge de fer. Son enfant fut enlevé vers Dieu et vers son trône." },
        { n: 6, t: "Et la femme s'enfuit dans le désert, où elle a un lieu préparé par Dieu, afin qu'elle y soit nourrie pendant mille deux cent soixante jours." },
        { n: 7, t: "Et il y eut une guerre dans le ciel. Michel et ses anges combattirent contre le dragon. Et le dragon et ses anges combattirent," },
        { n: 8, t: "mais ils ne furent pas les plus forts, et leur place ne fut plus trouvée dans le ciel." },
        { n: 9, t: "Et il fut précipité, le grand dragon, le serpent ancien, appelé le diable et Satan, celui qui séduit toute la terre, il fut précipité sur la terre, et ses anges furent précipités avec lui." },
        { n: 10, t: "Et j'entendis dans le ciel une voix forte qui disait: Maintenant le salut est arrivé, et la puissance, et le règne de notre Dieu, et l'autorité de son Christ; car il a été précipité, l'accusateur de nos frères, celui qui les accusait devant notre Dieu jour et nuit." },
        { n: 11, t: "Ils l'ont vaincu à cause du sang de l'agneau et à cause de la parole de leur témoignage, et ils n'ont pas aimé leur vie jusqu'à craindre la mort." },
        { n: 12, t: "C'est pourquoi réjouissez-vous, cieux, et vous qui habitez dans les cieux! Malheur à la terre et à la mer! Car le diable est descendu vers vous avec une grande fureur, sachant qu'il a peu de temps." },
        { n: 13, t: "Quand le dragon se vit précipité sur la terre, il poursuivit la femme qui avait enfanté l'enfant mâle." },
        { n: 14, t: "Et les deux ailes du grand aigle furent données à la femme, afin qu'elle s'envolât au désert, vers sa retraite, où elle est nourrie un temps, des temps, et la moitié d'un temps, loin de la face du serpent." },
        { n: 15, t: "Le serpent lança de sa bouche de l'eau comme un fleuve derrière la femme, pour l'entraîner dans le fleuve;" },
        { n: 16, t: "mais la terre secourut la femme, et la terre ouvrit sa bouche et absorba le fleuve que le dragon avait lancé de sa bouche." },
        { n: 17, t: "Et le dragon fut irrité contre la femme, et il s'en alla faire la guerre aux autres de sa postérité, à ceux qui gardent les commandements de Dieu et qui ont le témoignage de Jésus." }
      ]
    },
    {
      numero: 13,
      titre: "La bête sortant de la mer — La bête sortant de la terre",
      theme: "L'Antéchrist et le faux prophète",
      versets: [
        { n: 1, t: "Et il se tint sur le sable de la mer. Et je vis monter de la mer une bête qui avait sept têtes et dix cornes, et sur ses cornes dix diadèmes, et sur ses têtes des noms de blasphème." },
        { n: 2, t: "La bête que je vis était semblable à un léopard; ses pieds étaient comme ceux d'un ours, et sa gueule comme une gueule de lion. Le dragon lui donna sa puissance, et son trône, et une grande autorité." },
        { n: 3, t: "Et je vis l'une de ses têtes comme blessée à mort; mais sa blessure mortelle fut guérie. Et toute la terre était dans l'admiration derrière la bête." },
        { n: 4, t: "Et ils adorèrent le dragon, parce qu'il avait donné l'autorité à la bête; ils adorèrent la bête, en disant: Qui est semblable à la bête, et qui peut combattre contre elle?" },
        { n: 5, t: "Et il lui fut donné une bouche qui proférait des paroles arrogantes et des blasphèmes; et il lui fut donné le pouvoir d'agir pendant quarante-deux mois." },
        { n: 6, t: "Et elle ouvrit sa bouche en blasphèmes contre Dieu, pour blasphémer son nom et son tabernacle, et ceux qui habitent dans le ciel." },
        { n: 7, t: "Il lui fut donné de faire la guerre aux saints, et de les vaincre. Et il lui fut donné autorité sur toute tribu, tout peuple, toute langue, et toute nation." },
        { n: 8, t: "Et tous les habitants de la terre l'adoreront, ceux dont le nom n'est pas écrit, dès la fondation du monde, dans le livre de vie de l'agneau qui a été immolé." },
        { n: 9, t: "Si quelqu'un a des oreilles, qu'il entende!" },
        { n: 10, t: "Si quelqu'un mène en captivité, il ira en captivité; si quelqu'un tue par l'épée, il faut qu'il soit tué par l'épée. C'est ici la persévérance et la foi des saints." },
        { n: 11, t: "Puis je vis monter de la terre une autre bête, qui avait deux cornes semblables à celles d'un agneau, et qui parlait comme un dragon." },
        { n: 12, t: "Elle exerçait toute l'autorité de la première bête en sa présence, et elle faisait que la terre et ses habitants adoraient la première bête, dont la blessure mortelle avait été guérie." },
        { n: 13, t: "Elle opérait de grands prodiges, même jusqu'à faire descendre du feu du ciel sur la terre, à la vue des hommes." },
        { n: 14, t: "Et elle séduisait les habitants de la terre par les prodiges qu'il lui était donné d'opérer en présence de la bête, disant aux habitants de la terre de dresser une image à la bête qui avait la blessure de l'épée et qui vivait." },
        { n: 15, t: "Et il lui fut donné d'animer l'image de la bête, de sorte que l'image de la bête parlât, et de faire que ceux qui n'adoreraient pas l'image de la bête seraient tués." },
        { n: 16, t: "Et elle faisait que tous, petits et grands, riches et pauvres, libres et esclaves, reçussent une marque sur leur main droite ou sur leur front," },
        { n: 17, t: "et que personne ne pût acheter ni vendre, sans avoir la marque, le nom de la bête ou le nombre de son nom." },
        { n: 18, t: "C'est ici la sagesse. Que celui qui a de l'intelligence calcule le nombre de la bête. Car c'est un nombre d'homme, et son nombre est six cent soixante-six." }
      ]
    },
    {
      numero: 14,
      titre: "L'Agneau et les cent quarante-quatre mille",
      theme: "Moisson, vendange, annonces des anges",
      versets: [
        { n: 1, t: "Puis je regardai, et voici, l'agneau se tenait sur la montagne de Sion, et avec lui cent quarante-quatre mille personnes qui avaient son nom et le nom de son Père écrits sur leurs fronts." },
        { n: 2, t: "Et j'entendis du ciel une voix comme le bruit de grandes eaux et comme le bruit d'un fort tonnerre; et la voix que j'entendis était comme celle des joueurs de harpe qui jouaient de leurs harpes." },
        { n: 3, t: "Ils chantaient un cantique nouveau devant le trône et devant les quatre êtres vivants et les anciens; et personne ne pouvait apprendre le cantique, si ce n'est les cent quarante-quatre mille qui avaient été rachetés de la terre." },
        { n: 4, t: "Ce sont ceux qui ne se sont pas souillés avec des femmes, car ils sont vierges; ce sont ceux qui suivent l'agneau partout où il va. Ils ont été rachetés d'entre les hommes comme des prémices pour Dieu et pour l'agneau." },
        { n: 5, t: "Et dans leur bouche il ne s'est point trouvé de mensonge: ils sont sans défaut." },
        { n: 6, t: "Et je vis un autre ange qui volait par le milieu du ciel, ayant un Evangile éternel, pour l'annoncer aux habitants de la terre, à toute nation, à toute tribu, à toute langue, et à tout peuple." },
        { n: 7, t: "Il disait d'une voix forte: Craignez Dieu, et donnez-lui gloire, car l'heure de son jugement est venue; et adorez celui qui a fait le ciel, la terre, la mer, et les sources d'eaux." },
        { n: 8, t: "Un autre ange, un second, suivit en disant: Elle est tombée, elle est tombée, Babylone la grande, qui a abreuvé toutes les nations du vin de la fureur de son impudicité!" },
        { n: 9, t: "Un autre ange, un troisième, les suivit en disant d'une voix forte: Si quelqu'un adore la bête et son image, et reçoit une marque sur son front ou sur sa main," },
        { n: 10, t: "il boira, lui aussi, du vin de la fureur de Dieu, versé sans mélange dans la coupe de sa colère, et il sera tourmenté dans le feu et le soufre, devant les saints anges et devant l'agneau." },
        { n: 11, t: "Et la fumée de leur tourment monte aux siècles des siècles; et ils n'ont de repos ni jour ni nuit, ceux qui adorent la bête et son image, et quiconque reçoit la marque de son nom." },
        { n: 12, t: "C'est ici la persévérance des saints, qui gardent les commandements de Dieu et la foi de Jésus." },
        { n: 13, t: "Et j'entendis du ciel une voix qui disait: Ecris: Heureux dès à présent les morts qui meurent dans le Seigneur! Oui, dit l'Esprit, afin qu'ils se reposent de leurs travaux, car leurs oeuvres les suivent." },
        { n: 14, t: "Et je regardai, et voici, il y avait un nuage blanc, et sur le nuage quelqu'un d'assis qui ressemblait à un fils d'homme, ayant sur sa tête une couronne d'or et dans sa main une faucille tranchante." },
        { n: 15, t: "Et un autre ange sortit du temple, criant d'une voix forte à celui qui était assis sur le nuage: Lance ta faucille, et moissonne; car l'heure de moissonner est venue, et la moisson de la terre est mûre." },
        { n: 16, t: "Et celui qui était assis sur le nuage jeta sa faucille sur la terre; et la terre fut moissonnée." },
        { n: 17, t: "Et un autre ange sortit du temple qui est dans le ciel, tenant lui aussi une faucille tranchante." },
        { n: 18, t: "Et un autre ange, qui avait l'autorité sur le feu, sortit de l'autel, et dit à grand cri à celui qui avait la faucille tranchante: Lance ta faucille tranchante, et vendange les grappes de la vigne de la terre, car ses raisins sont mûrs." },
        { n: 19, t: "Et l'ange jeta sa faucille sur la terre, et il vendangea la vigne de la terre, et mit dans la grande cuve de la colère de Dieu." },
        { n: 20, t: "Et la cuve fut foulée hors de la ville, et il sortit de la cuve du sang jusqu'aux brides des chevaux, sur une étendue de mille six cents stades." }
      ]
    },
    {
      numero: 15,
      titre: "Les sept coupes",
      theme: "Les sept derniers fléaux",
      versets: [
        { n: 1, t: "Et je vis dans le ciel un autre signe, grand et admirable: sept anges tenant les sept derniers fléaux, car par eux la colère de Dieu est accomplie." },
        { n: 2, t: "Et je vis comme une mer de verre mêlée de feu; et ceux qui avaient triomphé de la bête et de son image et du nombre de son nom, se tenaient sur la mer de verre, ayant des harpes de Dieu." },
        { n: 3, t: "Et ils chantaient le cantique de Moïse, serviteur de Dieu, et le cantique de l'agneau, en disant: Tes oeuvres sont grandes et admirables, Seigneur Dieu tout-puissant! Tes voies sont justes et véritables, Roi des nations!" },
        { n: 4, t: "Qui ne te craindrait pas, Seigneur, et ne glorifierait pas ton nom? Car toi seul es saint. Et toutes les nations viendront se prosterner devant toi, parce que tes jugements ont été manifestés." },
        { n: 5, t: "Après cela je regardai, et le temple du tabernacle du témoignage fut ouvert dans le ciel;" },
        { n: 6, t: "et les sept anges qui tenaient les sept fléaux sortirent du temple, revêtus d'un lin pur et brillant, et ayant leurs poitrines ceintes de ceintures d'or." },
        { n: 7, t: "Et l'un des quatre êtres vivants donna aux sept anges sept coupes d'or, pleines de la colère de Dieu, qui vit aux siècles des siècles." },
        { n: 8, t: "Et le temple fut rempli de fumée à cause de la gloire de Dieu et de sa puissance; et personne ne pouvait entrer dans le temple jusqu'à ce que les sept fléaux des sept anges fussent accomplis." }
      ]
    },
    {
      numero: 16,
      titre: "Les sept coupes de la colère de Dieu",
      theme: "Les plaies finales",
      versets: [
        { n: 1, t: "Et j'entendis du temple une voix forte qui disait aux sept anges: Allez, et versez sur la terre les sept coupes de la colère de Dieu." },
        { n: 2, t: "Le premier alla verser sa coupe sur la terre: et un ulcère malin et douloureux frappa les hommes qui avaient la marque de la bête et qui adoraient son image." },
        { n: 3, t: "Le deuxième versa sa coupe dans la mer: et elle devint du sang, comme du sang de mort; et tout être vivant dans la mer mourut." },
        { n: 4, t: "Le troisième versa sa coupe dans les fleuves et dans les sources d'eaux: et ils devinrent du sang." },
        { n: 5, t: "Et j'entendis l'ange des eaux qui disait: Tu es juste, toi qui es et qui étais, le Saint, parce que tu as porté ce jugement;" },
        { n: 6, t: "car ils ont répandu le sang des saints et des prophètes; et tu leur as donné du sang à boire: ils l'ont mérité." },
        { n: 7, t: "Et j'entendis l'autel disant: Oui, Seigneur Dieu tout-puissant, tes jugements sont vrais et justes." },
        { n: 8, t: "Le quatrième versa sa coupe sur le soleil: et il lui fut donné de brûler les hommes avec le feu." },
        { n: 9, t: "Et les hommes furent brûlés par une grande chaleur, et ils blasphémèrent le nom du Dieu qui a l'autorité sur ces fléaux, et ils ne se repentirent pas pour lui donner gloire." },
        { n: 10, t: "Le cinquième versa sa coupe sur le trône de la bête: et son royaume fut couvert de ténèbres; et les hommes se mordaient la langue de douleur," },
        { n: 11, t: "et ils blasphémèrent le Dieu du ciel, à cause de leurs douleurs et de leurs ulcères, et ils ne se repentirent pas de leurs oeuvres." },
        { n: 12, t: "Le sixième versa sa coupe sur le grand fleuve, l'Euphrate: et ses eaux se desséchèrent, afin que le chemin des rois venant du côté du soleil levant fût préparé." },
        { n: 13, t: "Et je vis sortir de la bouche du dragon, et de la bouche de la bête, et de la bouche du faux prophète, trois esprits impurs, semblables à des grenouilles." },
        { n: 14, t: "Car ce sont des esprits de démons, qui font des prodiges et qui vont vers les rois de toute la terre habitée, afin de les rassembler pour le combat du grand jour du Dieu tout-puissant." },
        { n: 15, t: "Voici, je viens comme un voleur. Heureux celui qui veille et qui garde ses vêtements, afin qu'il ne marche pas nu et qu'on ne voie pas sa honte!" },
        { n: 16, t: "Et ils les rassemblèrent dans le lieu appelé en hébreu Harmaguédon." },
        { n: 17, t: "Le septième versa sa coupe dans l'air: et une voix forte sortit du temple, du trône, en disant: C'est fait!" },
        { n: 18, t: "Et il y eut des éclairs, des voix et des tonnerres; et il y eut un grand tremblement de terre, tel qu'il n'y en a jamais eu depuis que l'homme est sur la terre, un tremblement de terre si considérable et si violent." },
        { n: 19, t: "Et la grande ville fut divisée en trois parties, et les villes des nations s'effondrèrent; et Babylone la grande fut rappelée devant Dieu, qui lui donna la coupe de la colère de sa fureur." },
        { n: 20, t: "Et toutes les îles s'enfuirent, et les montagnes ne furent plus trouvées." },
        { n: 21, t: "Et des grêlons énormes, du poids d'un talent, tombèrent du ciel sur les hommes; et les hommes blasphémèrent Dieu à cause du fléau de la grêle, parce que ce fléau était très grand." }
      ]
    },
    {
      numero: 17,
      titre: "La grande prostituée — Le mystère de Babylone",
      theme: "Le mystère de Babylone",
      versets: [
        { n: 1, t: "L'un des sept anges qui tenaient les sept coupes vint, et me parla ainsi: Viens, je te montrerai le jugement de la grande prostituée qui est assise sur les grandes eaux." },
        { n: 2, t: "C'est avec elle que les rois de la terre se sont livrés à l'impudicité, et c'est du vin de son impudicité que les habitants de la terre se sont enivrés." },
        { n: 3, t: "Il me transporta en esprit dans un désert. Et je vis une femme assise sur une bête de couleur écarlate, pleine de noms de blasphème, ayant sept têtes et dix cornes." },
        { n: 4, t: "Cette femme était vêtue de pourpre et d'écarlate, et parée d'or, de pierres précieuses et de perles. Elle tenait dans sa main une coupe d'or pleine d'abominations et des impuretés de sa prostitution." },
        { n: 5, t: "Sur son front était écrit un nom, un mystère: Babylone la grande, la mère des impudiques et des abominations de la terre." },
        { n: 6, t: "Et je vis cette femme ivre du sang des saints et du sang des témoins de Jésus. Je fus très étonné, lorsque je la vis." },
        { n: 7, t: "Et l'ange me dit: Pourquoi t'étonnes-tu? Je te dirai le mystère de cette femme et de la bête qui la porte, celle qui a les sept têtes et les dix cornes." },
        { n: 8, t: "La bête que tu as vue était, et elle n'est plus; elle doit monter de l'abîme, et aller à la perdition. Et les habitants de la terre, ceux dont le nom n'est pas écrit dès la fondation du monde dans le livre de vie, s'étonneront en voyant la bête, parce qu'elle était, et n'est plus, et qu'elle sera." },
        { n: 9, t: "C'est ici qu'il faut un esprit plein de sagesse. Les sept têtes sont sept montagnes sur lesquelles la femme est assise;" },
        { n: 10, t: "ce sont aussi sept rois, dont cinq sont tombés, un est là, l'autre n'est pas encore venu, et quand il sera venu, il doit rester peu de temps." },
        { n: 11, t: "Et la bête qui était et qui n'est plus, est elle-même un huitième roi; elle est du nombre des sept, et elle va à la perdition." },
        { n: 12, t: "Les dix cornes que tu as vues sont dix rois qui n'ont pas encore reçu de royaume; mais ils reçoivent autorité comme rois pendant une heure avec la bête." },
        { n: 13, t: "Ils ont un même dessein, et ils donnent leur puissance et leur autorité à la bête." },
        { n: 14, t: "Ils combattront contre l'agneau, et l'agneau les vaincra, parce qu'il est le Seigneur des seigneurs et le Roi des rois, et les appelés, les élus et les fidèles qui sont avec lui les vaincront aussi." },
        { n: 15, t: "Et il me dit: Les eaux que tu as vues, sur lesquelles la prostituée est assise, ce sont des peuples, des foules, des nations et des langues." },
        { n: 16, t: "Et les dix cornes que tu as vues, et la bête, haïront la prostituée, ils la dépouilleront et la mettront à nu, mangeront ses chairs et la consumeront par le feu." },
        { n: 17, t: "Car Dieu a mis dans leur coeur d'exécuter son dessein et d'exécuter un même dessein, et de donner leur royauté à la bête, jusqu'à ce que les paroles de Dieu soient accomplies." },
        { n: 18, t: "Et la femme que tu as vue, c'est la grande ville qui a la royauté sur les rois de la terre." }
      ]
    },
    {
      numero: 18,
      titre: "La chute de Babylone",
      theme: "Le jugement de la grande cité",
      versets: [
        { n: 1, t: "Après cela, je vis descendre du ciel un autre ange, qui avait une grande autorité; et la terre fut éclairée de sa gloire." },
        { n: 2, t: "Il cria d'une voix forte, en disant: Elle est tombée, elle est tombée, Babylone la grande! Elle est devenue une habitation de démons, un repaire de tout esprit impur, un repaire de tout oiseau impur et odieux;" },
        { n: 3, t: "car toutes les nations ont bu du vin de la fureur de son impudicité, et les rois de la terre se sont livrés à l'impudicité avec elle, et les marchands de la terre se sont enrichis par la puissance de son luxe." },
        { n: 4, t: "Et j'entendis du ciel une autre voix qui disait: Sortez du milieu d'elle, mon peuple, afin que vous ne participiez point à ses péchés et que vous n'ayez point de part à ses fléaux." },
        { n: 5, t: "Car ses péchés se sont accumulés jusqu'au ciel, et Dieu s'est souvenu de ses iniquités." },
        { n: 6, t: "Payez-la comme elle a payé, et rendez-lui le double selon ses oeuvres; dans la coupe qu'elle a remplie versez-lui le double." },
        { n: 7, t: "Autant elle s'est glorifiée et plongée dans le luxe, autant donnez-lui de tourment et de deuil. Parce qu'elle dit en son coeur: Je suis reine, je ne suis pas veuve, et je ne verrai point de deuil;" },
        { n: 8, t: "à cause de cela, en un seul jour ses fléaux viendront, la mort, le deuil et la famine, et elle sera consumée par le feu. Car il est puissant, le Seigneur Dieu qui l'a jugée." },
        { n: 9, t: "Les rois de la terre, qui se sont livrés avec elle à l'impudicité et qui ont vécu dans les délices, pleureront et se lamenteront à cause d'elle, quand ils verront la fumée de son embrasement." },
        { n: 10, t: "Se tenant éloignés, dans la crainte de son tourment, ils diront: Malheur! malheur! la grande ville, Babylone, la ville puissante! En une seule heure ton jugement est venu!" },
        { n: 11, t: "Et les marchands de la terre pleurent et sont dans le deuil à cause d'elle, parce que personne n'achète plus leurs marchandises," },
        { n: 12, t: "marchandises d'or, d'argent, de pierres précieuses, de perles, de fin lin, de pourpre, de soie, d'écarlate, de tout bois de senteur, de tous objets en ivoire, de tous objets en bois précieux, en airain, en fer et en marbre," },
        { n: 13, t: "et de la cannelle, des aromates, du parfum, de la myrrhe, de l'encens, du vin, de l'huile, de la fine farine, du blé, des boeufs, des brebis, des chevaux, des chars, des corps et des âmes d'hommes." },
        { n: 14, t: "Les fruits que désirait ton âme sont éloignés de toi, et toutes tes choses délicates et magnifiques sont perdues pour toi; on n'y trouvera plus jamais rien." },
        { n: 15, t: "Les marchands de ces choses, qui se sont enrichis par elle, se tiendront éloignés, dans la crainte de son tourment; ils pleureront et seront dans le deuil," },
        { n: 16, t: "en disant: Malheur! malheur! la grande ville, qui était vêtue de fin lin, de pourpre et d'écarlate, et parée d'or, de pierres précieuses et de perles! En une seule heure tant de richesse a été détruite!" },
        { n: 17, t: "Et tous les pilotes, et tous ceux qui naviguent en quelque endroit, et les matelots, et tous ceux qui travaillent sur la mer, se tinrent éloignés," },
        { n: 18, t: "et s'écrièrent en voyant la fumée de son embrasement: Quelle ville était semblable à la grande ville?" },
        { n: 19, t: "Ils jetèrent de la poussière sur leurs têtes, ils pleurèrent et furent dans le deuil, en disant: Malheur! malheur! la grande ville, par laquelle se sont enrichis tous ceux qui avaient des navires sur la mer! En une seule heure elle a été détruite!" },
        { n: 20, t: "Fais éclater ta joie sur elle, ô ciel, et vous, saints apôtres et prophètes! car Dieu vous a fait justice d'elle." },
        { n: 21, t: "Et un ange puissant prit une pierre comme une grande meule, et la jeta dans la mer, en disant: C'est ainsi que sera précipitée avec violence Babylone, la grande ville, et elle ne sera plus trouvée." },
        { n: 22, t: "Et la voix des joueurs de harpe et des musiciens, des joueurs de flûte et des joueurs de trompette, ne s'entendra plus jamais au-dedans de toi; et il ne se trouvera plus dans toi aucun artisan d'un métier quelconque; et le bruit de la meule ne se fera plus entendre dans toi;" },
        { n: 23, t: "et la lumière d'une lampe ne brillera plus du tout dans toi; et la voix de l'époux et de l'épouse ne s'entendra plus jamais dans toi. Car tes marchands étaient les grands de la terre, parce que toutes les nations ont été séduites par tes enchantements." },
        { n: 24, t: "Et le sang des prophètes et des saints, et de tous ceux qui ont été tués sur la terre, a été trouvé dans cette ville." }
      ]
    },
    {
      numero: 19,
      titre: "Cantiques de victoire — Les noces de l'Agneau — La bête vaincue",
      theme: "L'Alléluia et le retour du Roi",
      versets: [
        { n: 1, t: "Après cela, j'entendis dans le ciel comme une voix forte d'une grande foule qui disait: Alléluia! Le salut, la gloire et la puissance sont à notre Dieu," },
        { n: 2, t: "parce que ses jugements sont vrais et justes; car il a jugé la grande prostituée qui corrompait la terre par son impudicité, et il a vengé le sang de ses serviteurs en le redemandant de sa main." },
        { n: 3, t: "Et ils dirent une seconde fois: Alléluia! Et la fumée de son embrasement monte aux siècles des siècles." },
        { n: 4, t: "Et les vingt-quatre anciens et les quatre êtres vivants se prosternèrent, et ils adorèrent Dieu assis sur le trône, en disant: Amen! Alléluia!" },
        { n: 5, t: "Et une voix sortit du trône, disant: Louez notre Dieu, vous tous qui le servez, vous qui le craignez, petits et grands!" },
        { n: 6, t: "Et j'entendis comme une voix d'une grande foule, comme un bruit de grandes eaux, et comme un bruit de forts tonnerres, qui disaient: Alléluia! Car le Seigneur notre Dieu tout-puissant est entré dans son règne." },
        { n: 7, t: "Réjouissons-nous et soyons dans l'allégresse et donnons-lui gloire; car les noces de l'agneau sont venues, et son épouse s'est préparée," },
        { n: 8, t: "et il lui a été donné de se revêtir d'un fin lin, brillant et pur. Car le fin lin, ce sont les oeuvres justes des saints." },
        { n: 9, t: "Et il me dit: Ecris: Heureux ceux qui sont appelés au festin des noces de l'agneau! Et il me dit: Ce sont là de véritables paroles de Dieu." },
        { n: 10, t: "Je me jetai à ses pieds pour l'adorer. Et il me dit: Garde-toi de le faire! Je suis ton compagnon de service, et celui de tes frères qui ont le témoignage de Jésus. Adore Dieu. Car le témoignage de Jésus est l'esprit de la prophétie." },
        { n: 11, t: "Puis je vis le ciel ouvert, et voici, il parut un cheval blanc. Celui qui le montait s'appelle Fidèle et Véritable, et il juge et combat avec justice." },
        { n: 12, t: "Ses yeux étaient comme une flamme de feu; sur sa tête il y avait plusieurs diadèmes; il avait un nom écrit que personne ne connaît, si ce n'est lui-même;" },
        { n: 13, t: "et il était revêtu d'un vêtement teint de sang. Son nom est la Parole de Dieu." },
        { n: 14, t: "Et les armées qui sont dans le ciel le suivaient sur des chevaux blancs, revêtues d'un fin lin blanc et pur." },
        { n: 15, t: "De sa bouche sortait une épée aiguë, pour frapper les nations; il les paîtra avec une verge de fer; et il foulera la cuve du vin de la fureur et de la colère du Dieu tout-puissant." },
        { n: 16, t: "Il a sur son vêtement et sur sa cuisse un nom écrit: Roi des rois et Seigneur des seigneurs." },
        { n: 17, t: "Et je vis un ange debout dans le soleil. Il cria d'une voix forte, disant à tous les oiseaux qui volaient par le milieu du ciel: Venez, rassemblez-vous pour le grand festin de Dieu," },
        { n: 18, t: "afin que vous mangiez les chairs des rois, les chairs des chefs militaires, les chairs des hommes forts, les chairs des chevaux et de ceux qui les montent, et les chairs de tous les hommes libres et esclaves, petits et grands." },
        { n: 19, t: "Et je vis la bête et les rois de la terre et leurs armées rassemblés pour faire la guerre à celui qui était assis sur le cheval et à son armée." },
        { n: 20, t: "Et la bête fut prise, et avec elle le faux prophète, qui avait fait devant elle les prodiges par lesquels il avait séduit ceux qui avaient reçu la marque de la bête et ceux qui adoraient son image. Tous deux furent jetés vivants dans l'étang de feu ardent de soufre." },
        { n: 21, t: "Et les autres furent tués par l'épée qui sortait de la bouche de celui qui était assis sur le cheval, et tous les oiseaux se rassasièrent de leurs chairs." }
      ]
    },
    {
      numero: 20,
      titre: "Le règne de mille ans — Le jugement dernier",
      theme: "Satan lié — résurrection — jugement",
      versets: [
        { n: 1, t: "Et je vis descendre du ciel un ange qui avait la clef de l'abîme et une grande chaîne dans sa main." },
        { n: 2, t: "Il saisit le dragon, le serpent ancien, qui est le diable et Satan, et il le lia pour mille ans." },
        { n: 3, t: "Il le jeta dans l'abîme, ferma et scella l'entrée au-dessus de lui, afin qu'il ne séduise plus les nations, jusqu'à ce que les mille ans soient accomplis. Après cela, il faut qu'il soit délié pour un peu de temps." },
        { n: 4, t: "Puis je vis des trônes; et à ceux qui s'assirent sur eux le jugement fut remis. Et je vis les âmes de ceux qui avaient été décapités à cause du témoignage de Jésus et à cause de la parole de Dieu, et de ceux qui n'avaient pas adoré la bête ni son image, et qui n'avaient pas reçu la marque sur le front et sur la main. Ils revinrent à la vie, et ils régnèrent avec Christ pendant mille ans." },
        { n: 5, t: "Les autres morts ne revinrent point à la vie jusqu'à ce que les mille ans fussent accomplis. C'est la première résurrection." },
        { n: 6, t: "Heureux et saint celui qui a part à la première résurrection! La seconde mort n'a point de pouvoir sur eux; mais ils seront sacrificateurs de Dieu et de Christ, et ils régneront avec lui pendant mille ans." },
        { n: 7, t: "Quand les mille ans seront accomplis, Satan sera relâché de sa prison." },
        { n: 8, t: "Et il sortira pour séduire les nations qui sont aux quatre coins de la terre, Gog et Magog, afin de les rassembler pour la bataille. Leur nombre est comme le sable de la mer." },
        { n: 9, t: "Et ils montèrent sur la surface de la terre, et ils investirent le camp des saints et la ville bien-aimée. Mais un feu descendit du ciel et les dévora." },
        { n: 10, t: "Et le diable qui les séduisait fut jeté dans l'étang de feu et de soufre, où sont la bête et le faux prophète. Et ils seront tourmentés jour et nuit, aux siècles des siècles." },
        { n: 11, t: "Et je vis un grand trône blanc, et celui qui était assis dessus. La terre et le ciel s'enfuirent devant sa face, et il ne fut plus trouvé de place pour eux." },
        { n: 12, t: "Et je vis les morts, les grands et les petits, qui se tenaient devant le trône. Des livres furent ouverts. Et un autre livre fut ouvert, celui qui est le livre de vie. Et les morts furent jugés selon leurs oeuvres, d'après ce qui était écrit dans ces livres." },
        { n: 13, t: "La mer rendit les morts qui étaient en elle, la mort et le séjour des morts rendirent les morts qui étaient en eux; et chacun fut jugé selon ses oeuvres." },
        { n: 14, t: "Et la mort et le séjour des morts furent jetés dans l'étang de feu, c'est la seconde mort, l'étang de feu." },
        { n: 15, t: "Quiconque ne fut pas trouvé écrit dans le livre de vie fut jeté dans l'étang de feu." }
      ]
    },
    {
      numero: 21,
      titre: "La nouvelle Jérusalem",
      theme: "Le ciel nouveau et la terre nouvelle",
      versets: [
        { n: 1, t: "Puis je vis un ciel nouveau et une terre nouvelle; car le premier ciel et la première terre avaient disparu, et la mer n'était plus." },
        { n: 2, t: "Et je vis descendre du ciel, d'auprès de Dieu, la ville sainte, la nouvelle Jérusalem, préparée comme une épouse qui s'est parée pour son époux." },
        { n: 3, t: "Et j'entendis du trône une voix forte qui disait: Voici le tabernacle de Dieu avec les hommes! Il habitera avec eux, et ils seront ses peuples, et Dieu lui-même sera avec eux." },
        { n: 4, t: "Il essuiera toute larme de leurs yeux, et la mort ne sera plus, et il n'y aura plus ni deuil, ni cri, ni douleur, car les premières choses ont disparu." },
        { n: 5, t: "Et celui qui était assis sur le trône dit: Voici, je fais toutes choses nouvelles. Et il dit: Ecris; car ces paroles sont certaines et véritables." },
        { n: 6, t: "Et il me dit: C'est fait! Je suis l'Alpha et l'Oméga, le commencement et la fin. A celui qui a soif je donnerai de la source de l'eau de la vie, gratuitement." },
        { n: 7, t: "Celui qui vaincra héritera ces choses; je serai son Dieu, et il sera mon fils." },
        { n: 8, t: "Mais pour les lâches, les incrédules, les abominables, les meurtriers, les impudiques, les enchanteurs, les idolâtres, et tous les menteurs, leur part sera dans l'étang ardent de feu et de soufre, ce qui est la seconde mort." },
        { n: 9, t: "Et l'un des sept anges qui tenaient les sept coupes remplies des sept derniers fléaux vint, et il m'adressa la parole en disant: Viens, et je te montrerai l'épouse, la femme de l'agneau." },
        { n: 10, t: "Et il me transporta en esprit sur une grande et haute montagne; et il me montra la ville sainte, Jérusalem, qui descendait du ciel d'auprès de Dieu," },
        { n: 11, t: "ayant la gloire de Dieu. Son éclat était semblable à celui d'une pierre très précieuse, d'une pierre de jaspe transparente comme du cristal." },
        { n: 12, t: "Elle avait une grande et haute muraille. Elle avait douze portes, et sur les portes douze anges, et des noms écrits, ceux des douze tribus des fils d'Israël." },
        { n: 13, t: "A l'orient trois portes, au nord trois portes, au midi trois portes, et à l'occident trois portes." },
        { n: 14, t: "La muraille de la ville avait douze fondements, et sur eux les douze noms des douze apôtres de l'agneau." },
        { n: 15, t: "Celui qui me parlait avait pour mesure un roseau d'or, pour mesurer la ville, ses portes et sa muraille." },
        { n: 16, t: "La ville avait la forme d'un carré; sa longueur était égale à sa largeur. Il mesura la ville avec le roseau: douze mille stades. La longueur, la largeur et la hauteur en étaient égales." },
        { n: 17, t: "Il en mesura la muraille: cent quarante-quatre coudées, mesure d'homme, qui est celle de l'ange." },
        { n: 18, t: "La muraille était bâtie en jaspe, et la ville était d'or pur, semblable à du verre pur." },
        { n: 19, t: "Les fondements de la muraille de la ville étaient ornés de pierres précieuses de toute sorte: le premier fondement était de jaspe, le deuxième de saphir, le troisième de calcédoine, le quatrième d'émeraude," },
        { n: 20, t: "le cinquième de sardonyx, le sixième de sardoine, le septième de chrysolithe, le huitième de béryl, le neuvième de topaze, le dixième de chrysoprase, le onzième d'hyacinthe, le douzième d'améthyste." },
        { n: 21, t: "Les douze portes étaient douze perles; chaque porte était d'une seule perle. Et la rue de la ville était d'or pur, transparent comme du verre." },
        { n: 22, t: "Je ne vis point de temple dans la ville; car le Seigneur Dieu tout-puissant est son temple, ainsi que l'agneau." },
        { n: 23, t: "La ville n'a besoin ni du soleil ni de la lune pour l'éclairer; car la gloire de Dieu l'éclaire, et l'agneau est son flambeau." },
        { n: 24, t: "Les nations marcheront à sa lumière, et les rois de la terre y apporteront leur gloire." },
        { n: 25, t: "Ses portes ne se fermeront point pendant le jour, car là il n'y aura point de nuit." },
        { n: 26, t: "On y apportera la gloire et l'honneur des nations." },
        { n: 27, t: "Il n'entrera chez elle rien de souillé, ni personne qui se livre à l'abomination et au mensonge; il n'entrera que ceux qui sont écrits dans le livre de vie de l'agneau." }
      ]
    },
    {
      numero: 22,
      titre: "Le fleuve d'eau vive — Epilogue",
      theme: "La conclusion — Je viens bientôt!",
      versets: [
        { n: 1, t: "Et il me montra un fleuve d'eau de la vie, limpide comme du cristal, qui sortait du trône de Dieu et de l'agneau." },
        { n: 2, t: "Au milieu de la place de la ville et sur les deux bords du fleuve, il y avait un arbre de vie, produisant douze fruits, rendant son fruit chaque mois, et dont les feuilles servaient à la guérison des nations." },
        { n: 3, t: "Il n'y aura plus d'anathème. Le trône de Dieu et de l'agneau sera dans la ville; ses serviteurs le serviront," },
        { n: 4, t: "et ils verront sa face, et son nom sera sur leurs fronts." },
        { n: 5, t: "Il n'y aura plus de nuit; et ils n'auront besoin ni de lampe ni de lumière, parce que le Seigneur Dieu les éclairera. Et ils régneront aux siècles des siècles." },
        { n: 6, t: "Et il me dit: Ces paroles sont certaines et véritables; et le Seigneur, le Dieu des esprits des prophètes, a envoyé son ange pour montrer à ses serviteurs les choses qui doivent arriver bientôt." },
        { n: 7, t: "Et voici, je viens bientôt. Heureux celui qui garde les paroles de la prophétie de ce livre!" },
        { n: 8, t: "C'est moi Jean qui ai entendu et vu ces choses. Et après avoir entendu et vu, je tombai aux pieds de l'ange qui me les montrait, pour l'adorer." },
        { n: 9, t: "Et il me dit: Garde-toi de le faire! Je suis ton compagnon de service, et celui de tes frères les prophètes, et de ceux qui gardent les paroles de ce livre. Adore Dieu." },
        { n: 10, t: "Et il me dit: Ne scelle pas les paroles de la prophétie de ce livre, car le temps est proche." },
        { n: 11, t: "Que celui qui est injuste soit encore injuste, et que celui qui est souillé soit encore souillé; et que celui qui est juste pratique encore la justice, et que celui qui est saint se sanctifie encore." },
        { n: 12, t: "Voici, je viens bientôt, et ma rétribution est avec moi, pour rendre à chacun selon ce qu'est son oeuvre." },
        { n: 13, t: "Je suis l'Alpha et l'Oméga, le premier et le dernier, le commencement et la fin." },
        { n: 14, t: "Heureux ceux qui lavent leurs robes, afin d'avoir droit à l'arbre de vie, et de pouvoir entrer par les portes dans la ville!" },
        { n: 15, t: "Dehors les chiens, et les enchanteurs, et les impudiques, et les meurtriers, et les idolâtres, et quiconque aime et pratique le mensonge!" },
        { n: 16, t: "Moi Jésus, j'ai envoyé mon ange pour vous attester ces choses dans les Eglises. Je suis le rejeton et la postérité de David, l'étoile brillante du matin." },
        { n: 17, t: "Et l'Esprit et l'épouse disent: Viens. Et que celui qui entend dise: Viens. Et que celui qui a soif vienne; que celui qui veut prenne de l'eau de la vie, gratuitement." },
        { n: 18, t: "Je le déclare à quiconque entend les paroles de la prophétie de ce livre: Si quelqu'un y ajoute quelque chose, Dieu le frappera des fléaux décrits dans ce livre;" },
        { n: 19, t: "et si quelqu'un retranche quelque chose des paroles du livre de cette prophétie, Dieu retranchera sa part de l'arbre de vie et de la ville sainte, décrits dans ce livre." },
        { n: 20, t: "Celui qui atteste ces choses dit: Oui, je viens bientôt. Amen! Viens, Seigneur Jésus!" },
        { n: 21, t: "Que la grâce du Seigneur Jésus soit avec tous!" }
      ]
    }
  ]
};

// Symboles clés
const SYMBOLES = [
  { nom: "L'Agneau", icone: "🐑", description: "Jésus-Christ, sacrifié et victorieux. Symbole de rédemption et de puissance divine dans la faiblesse.", refs: ["Ap 5:6", "Ap 19:7"] },
  { nom: "Le Dragon", icone: "🐉", description: "Satan, le grand serpent ancien. Représente le mal, la séduction et l'opposition à Dieu.", refs: ["Ap 12:3", "Ap 20:2"] },
  { nom: "La Bête 666", icone: "⚔️", description: "L'Antéchrist, figure de l'autorité politique corrompue. Le nombre 666 représente l'imperfection humaine portée à l'extrême.", refs: ["Ap 13:18"] },
  { nom: "Les 7 Sceaux", icone: "📜", description: "Révèlent le plan divin pour l'histoire. Chaque sceau ouvert dévoile un aspect du jugement et de la souveraineté de Dieu.", refs: ["Ap 6:1", "Ap 8:1"] },
  { nom: "Les 7 Trompettes", icone: "📯", description: "Annoncent des jugements progressifs sur la terre, semblables aux plaies d'Égypte.", refs: ["Ap 8:7", "Ap 11:15"] },
  { nom: "Les 7 Coupes", icone: "🏺", description: "La colère complète et finale de Dieu versée sur les impies.", refs: ["Ap 16:1"] },
  { nom: "Babylone", icone: "🏛️", description: "Symbole de tout système humain opposé à Dieu: pouvoir politique, économique et religieux corrompu.", refs: ["Ap 17:5", "Ap 18:2"] },
  { nom: "La Nouvelle Jérusalem", icone: "🌟", description: "La demeure éternelle de Dieu avec son peuple. Symbole de la rédemption accomplie et de la communion parfaite.", refs: ["Ap 21:2"] },
  { nom: "Le Livre de Vie", icone: "📖", description: "Le registre céleste des rachetés. Ceux dont le nom n'y figure pas subissent la seconde mort.", refs: ["Ap 20:12", "Ap 21:27"] },
  { nom: "Les 144 000", icone: "✡️", description: "Nombre symbolique (12×12×1000) représentant la totalité du peuple de Dieu scellé et protégé.", refs: ["Ap 7:4", "Ap 14:1"] },
  { nom: "L'Alpha et l'Oméga", icone: "🔤", description: "Titre divin signifiant que Dieu est le commencement et la fin de toutes choses.", refs: ["Ap 1:8", "Ap 22:13"] },
  { nom: "La Mer de Verre", icone: "🌊", description: "La transcendance et la pureté de Dieu. Séparation entre le divin et le créé.", refs: ["Ap 4:6", "Ap 15:2"] }
];

// Personnages clés
const PERSONNAGES = [
  {
    nom: "Jean",
    role: "L'auteur",
    description: "Apôtre et prophète, exilé sur l'île de Patmos. Reçoit les visions et les transcrit pour les sept Églises d'Asie. Traditionnellement identifié à l'apôtre Jean, fils de Zébédée.",
    couleur: "#4A90D9",
    icone: "✍️"
  },
  {
    nom: "Jésus-Christ",
    role: "L'Agneau et le Fils de l'homme",
    description: "Central à tout le livre. Apparaît comme le Fils de l'homme glorifié (ch.1), l'Agneau immolé (ch.5), le Cavalier sur le cheval blanc (ch.19) et l'Alpha et l'Oméga (ch.22).",
    couleur: "#D4AF37",
    icone: "👑"
  },
  {
    nom: "Dieu le Père",
    role: "Celui qui siège sur le trône",
    description: "Présenté comme le Tout-Puissant, celui qui est, qui était et qui vient. Source de tout jugement et de toute rédemption.",
    couleur: "#FFFFFF",
    icone: "☁️"
  },
  {
    nom: "Satan / Le Dragon",
    role: "L'adversaire",
    description: "Le grand dragon rouge aux sept têtes. Précipité du ciel, il persécute l'Église et séduit les nations. Finalement lié pour mille ans puis jeté dans l'étang de feu.",
    couleur: "#CC0000",
    icone: "🐉"
  },
  {
    nom: "La Bête de la mer",
    role: "L'Antéchrist",
    description: "Reçoit sa puissance du dragon. Représente l'autorité politique antichrétienne. Associé au nombre 666 et à la marque imposée aux habitants de la terre.",
    couleur: "#8B0000",
    icone: "👹"
  },
  {
    nom: "Le Faux Prophète",
    role: "La Bête de la terre",
    description: "Sert la première bête, opère des miracles pour séduire et force l'humanité à adorer l'image de la bête.",
    couleur: "#800080",
    icone: "🐍"
  },
  {
    nom: "Les Deux Témoins",
    role: "Les prophètes de la fin",
    description: "Prophétisent pendant 1260 jours, ont pouvoir de fermer le ciel et de changer les eaux en sang. Tués par la bête puis ressuscités au troisième jour et demi.",
    couleur: "#228B22",
    icone: "🕯️"
  },
  {
    nom: "Michel",
    role: "L'archange",
    description: "Chef des armées angéliques. Mène la guerre contre le dragon dans le ciel et le précipite sur la terre.",
    couleur: "#4169E1",
    icone: "⚔️"
  },
  {
    nom: "Les 24 Anciens",
    role: "Les adorateurs célestes",
    description: "Représentent probablement les 12 tribus d'Israël et les 12 apôtres — l'Ancien et le Nouveau Testament réunis. Adorent Dieu autour du trône.",
    couleur: "#DAA520",
    icone: "👴"
  },
  {
    nom: "La Femme",
    role: "Le peuple de Dieu",
    description: "Revêtue du soleil, ayant la lune sous ses pieds. Représente Israël / l'Église. Persécutée par le dragon mais protégée par Dieu.",
    couleur: "#FF69B4",
    icone: "👸"
  }
];

// Quiz
const QUIZ_QUESTIONS = [
  {
    question: "Sur quelle île Jean a-t-il reçu ses visions ?",
    options: ["Chypre", "Patmos", "Rhodes", "Crète"],
    reponse: 1,
    explication: "Jean était exilé sur l'île de Patmos 'à cause de la parole de Dieu et du témoignage de Jésus' (Ap 1:9)."
  },
  {
    question: "Combien d'Églises les lettres de l'Apocalypse sont-elles adressées ?",
    options: ["5", "7", "12", "24"],
    reponse: 1,
    explication: "Les sept Églises sont : Éphèse, Smyrne, Pergame, Thyatire, Sardes, Philadelphie et Laodicée (Ap 1:11)."
  },
  {
    question: "Quel est le nombre de la Bête ?",
    options: ["444", "555", "666", "777"],
    reponse: 2,
    explication: "'Son nombre est six cent soixante-six' (Ap 13:18). C'est un nombre d'homme, symbolisant l'imperfection absolue."
  },
  {
    question: "Combien de personnes sont marquées du sceau parmi les tribus d'Israël ?",
    options: ["12 000", "72 000", "144 000", "1 000 000"],
    reponse: 2,
    explication: "144 000 = 12 tribus × 12 000 par tribu. Ce nombre symbolique représente la totalité du peuple de Dieu protégé (Ap 7:4)."
  },
  {
    question: "Qui ouvre le livre aux sept sceaux ?",
    options: ["Jean", "Michel", "L'Agneau", "Un des anciens"],
    reponse: 2,
    explication: "Seul l'Agneau — Jésus-Christ — est digne d'ouvrir le livre (Ap 5:5-7). Il est décrit comme 'le lion de la tribu de Juda'."
  },
  {
    question: "Quelle couleur est le cheval de la Mort ?",
    options: ["Blanc", "Rouge", "Noir", "Pâle"],
    reponse: 3,
    explication: "'Il parut un cheval d'une couleur pâle. Celui qui le montait se nommait la Mort' (Ap 6:8)."
  },
  {
    question: "Quelle Église est décrite comme 'ni froide ni bouillante' ?",
    options: ["Éphèse", "Sardes", "Laodicée", "Thyatire"],
    reponse: 2,
    explication: "Laodicée : 'tu n'es ni froid ni bouillant… je te vomirai de ma bouche' (Ap 3:15-16). C'est la lettre la plus sévère."
  },
  {
    question: "Pendant combien d'ans Satan est-il lié ?",
    options: ["100 ans", "700 ans", "1000 ans", "7000 ans"],
    reponse: 2,
    explication: "Satan est lié pour 'mille ans' (Ap 20:2) — le fameux millénium. Après quoi il est relâché brièvement avant d'être jeté dans l'étang de feu."
  },
  {
    question: "Combien d'anges tiennent les sept coupes de la colère de Dieu ?",
    options: ["3", "5", "7", "12"],
    reponse: 2,
    explication: "Sept anges portent les sept dernières coupes (Ap 15:1). Ces coupes contiennent les sept derniers fléaux."
  },
  {
    question: "Quelle ville est symbolisée par 'Babylone la grande' ?",
    options: ["Jérusalem", "Athènes", "Rome", "Babylone historique"],
    reponse: 2,
    explication: "Babylone est généralement interprétée comme Rome — la puissance persécutrice de l'époque de Jean. Mais le symbole dépasse Rome et représente tout système humain opposé à Dieu."
  },
  {
    question: "Qu'est-ce qui coule du trône de Dieu dans la Nouvelle Jérusalem ?",
    options: ["Du lait et du miel", "Un fleuve d'eau de la vie", "De l'or fondu", "De la lumière pure"],
    reponse: 1,
    explication: "'Un fleuve d'eau de la vie, limpide comme du cristal, qui sortait du trône de Dieu et de l'agneau' (Ap 22:1)."
  },
  {
    question: "Quel titre de Jésus signifie 'commencement et fin' ?",
    options: ["Emmanuel", "Alpha et Oméga", "Lion de Juda", "Étoile du matin"],
    reponse: 1,
    explication: "'Je suis l'Alpha et l'Oméga, le premier et le dernier, le commencement et la fin' (Ap 22:13). Alpha et Oméga sont la première et dernière lettres de l'alphabet grec."
  }
];

// Plan général du livre
const PLAN_LIVRE = [
  { section: "Prologue", chapitres: "1", description: "Vision inaugurale du Christ glorifié à Patmos" },
  { section: "Les 7 Lettres", chapitres: "2–3", description: "Messages aux sept Églises d'Asie" },
  { section: "Le Trône Céleste", chapitres: "4–5", description: "Vision du trône de Dieu et de l'Agneau" },
  { section: "Les 7 Sceaux", chapitres: "6–8:1", description: "Les cavaliers de l'Apocalypse et les martyrs" },
  { section: "Les 7 Trompettes", chapitres: "8:2–11", description: "Fléaux progressifs et les deux témoins" },
  { section: "Le Grand Conflit", chapitres: "12–14", description: "Dragon, Bête, Faux Prophète contre l'Église" },
  { section: "Les 7 Coupes", chapitres: "15–16", description: "La colère finale de Dieu" },
  { section: "Chute de Babylone", chapitres: "17–19", description: "Jugement de la prostituée et retour du Christ" },
  { section: "Le Millénium", chapitres: "20", description: "Satan lié, règne de mille ans, jugement dernier" },
  { section: "La Nouvelle Création", chapitres: "21–22", description: "Ciel nouveau, terre nouvelle, Jérusalem céleste" }
];

export { APOCALYPSE_LSG };
