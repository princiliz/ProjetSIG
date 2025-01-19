export const translations = {
    fr: {
      // Navigation et titres généraux
      title: 'Admin Electoral',
      bureaux: 'Bureaux de vote',
      resultats: 'Résultats',
      scrutateurs: 'Scrutateurs',
      centres: 'Centres de vote',
      securite: 'Sécurité',
      parametres: 'Paramètres',
      deconnexion: 'Déconnexion',
      switchToEn: 'Switch to English',
      currentLang: 'FR',

      // Page des bureaux de vote
        pollingStations: {
            newStation: "Nouveau Bureau",
            searchPlaceholder: "Rechercher un bureau...",
            totalStations: "Total Bureaux",
            totalCapacity: "Capacité Totale",
            activeStations: "Bureaux Actifs",
            
            tableHeaders: {
                name: "Nom",
                votingCenter: "Centre de vote",
                location: "Localisation",
                coordinates: "Coordonnées",
                capacity: "Capacité",
                status: "Statut",
                actions: "Actions"
            },
            
            modal: {
                add: "Ajouter un nouveau bureau de vote",
                edit: "Modifier le bureau de vote",
                votingCenterName: "Centre de vote",
                pollingStationName: "Nom du bureau de vote",
                region: "Région",
                selectRegion: "Sélectionnez une région",
                department: "Département",
                selectDepartment: "Sélectionnez un département",
                district: "Arrondissement",
                selectDistrict: "Sélectionnez un arrondissement",
                capacity: "Capacité",
                status: "Statut",
                latitude: "Latitude",
                longitude: "Longitude",
                cancel: "Annuler",
                create: "Créer",
                modify: "Modifier"
            },
            
            status: {
                active: "Actif",
                preparation: "En préparation",
                inactive: "Inactif"
            },
            
            delete: {
                confirm: "Confirmer",
                cancel: "Annuler"
            },
            
            noStations: "Aucun bureau de vote enregistré",
            addStation: "Ajouter un bureau"
        },
  
      // Page des résultats
        results: {
            summary: 'Résumé',
            details: 'Détails',
            anomalies: 'Anomalies',
            downloadResults: 'Télécharger les résultats',
            uploadPV: 'Téléverser PV',
            filterResults: 'Filtrer les résultats',
            totalVotes: 'Votes totaux',
            validVotes: 'Votes valides',
            invalidVotes: 'Votes invalides',
            blankVotes: 'Votes blancs',
            participation: 'Taux de participation',
            regions: 'Régions',
            departments: 'Départements',
            districts: 'Arrondissements',
            pollingStations: 'Bureaux de vote',
            candidate: 'Candidat',
            votes: 'Voix',
            percentage: 'Pourcentage',
            detectedAnomalies: 'Anomalies détectées',
            status: 'Statut',
            actions: 'Actions',
            all: 'Toutes les régions',
            exportTitle: 'Exporter les résultats',
            exportFormat: 'Format d\'export',
            exportRegion: 'Région à exporter',
            detailedResults: 'Résultats détaillés',
            byRegion: 'Par région',
            byDepartment: 'Par département',
            byDistrict: 'Par arrondissement',
            anomalyType: 'Type d\'anomalie',
            anomalyLocation: 'Localisation',
            anomalyDescription: 'Description',
            resolveAnomaly: 'Résoudre',
            pendingValidation: 'En attente de validation',
            validated: 'Validé',
            rejected: 'Rejeté',

            resultsSummary: {
                resultsByCandidate: 'Résultats par candidat',
                voteDistribution: 'Répartition des votes',
                summaryCharts: 'Graphiques récapitulatifs',
                votesCount: 'Nombre de voix',
                percentageOfVotes: 'Pourcentage des votes',
                validVotesPercentage: 'Pourcentage des votes valides',
                totalValidVotes: 'Total des votes valides',
                totalInvalidVotes: 'Total des votes invalides',
                totalBlankVotes: 'Total des votes blancs',
                participationRate: 'Taux de participation',
                votersCount: 'Nombre d\'électeurs',
                
                tooltips: {
                    votes: 'Voix',
                    percentage: 'Pourcentage',
                    candidate: 'Candidat',
                    total: 'Total'
                }
            }
        },

      // Page de gestion des scrutateurs
        pollWorkers: {
            searchScrutateurs: "Rechercher des scrutateurs...",
            addScrutateur: "Ajouter un scrutateur",
            name: "Nom",
            email: "Email",
            phone: "Téléphone",
            pollingStation: "Bureau de vote",
            selectPollingStation: "Sélectionner un bureau de vote",
            save: "Enregistrer",
            cancel: "Annuler",
            actions: "Actions",
            username: "Nom d'utilisateur",
            password: "Mot de passe",
            votingCenter: "Centre de vote",
            selectVotingCenter: "Sélectionner un centre de vote"
        }
    },

    en: {
      // Navigation and general titles
      title: 'Electoral Admin',
      bureaux: 'Polling Stations',
      resultats: 'Results',
      scrutateurs: 'Poll Workers',
      centres: 'Voting Centers',
      securite: 'Security',
      parametres: 'Settings',
      deconnexion: 'Logout',
      switchToFr: 'Passer en français',
      currentLang: 'EN',

      // Polling stations page
      pollingStations: {
        newStation: "New Station",
        searchPlaceholder: "Search for a station...",
        totalStations: "Total Stations",
        totalCapacity: "Total Capacity",
        activeStations: "Active Stations",
        
        tableHeaders: {
            name: "Name",
            votingCenter: "Voting Center",
            location: "Location",
            coordinates: "Coordinates",
            capacity: "Capacity",
            status: "Status",
            actions: "Actions"
        },
        
        modal: {
            add: "Add new polling station",
            edit: "Edit polling station",
            votingCenterName: "Voting Center",
            pollingStationName: "Polling Station Name",
            region: "Region",
            selectRegion: "Select a region",
            department: "Department",
            selectDepartment: "Select a department",
            district: "District",
            selectDistrict: "Select a district",
            capacity: "Capacity",
            status: "Status",
            latitude: "Latitude",
            longitude: "Longitude",
            cancel: "Cancel",
            create: "Create",
            modify: "Modify"
        },

        status: {
            active: "Active",
            preparation: "In preparation",
            inactive: "Inactive"
        },

        delete: {
            confirm: "Confirm",
            cancel: "Cancel"
        },
        noStations: "No polling stations registered",
        addStation: "Add station"
      },
  
      // Results page
        results: {
            summary: 'Summary',
            details: 'Details',
            anomalies: 'Anomalies',
            downloadResults: 'Download Results',
            uploadPV: 'Upload Report',
            filterResults: 'Filter Results',
            totalVotes: 'Total Votes',
            validVotes: 'Valid Votes',
            invalidVotes: 'Invalid Votes',
            blankVotes: 'Blank Votes',
            participation: 'Participation Rate',
            regions: 'Regions',
            departments: 'Departments',
            districts: 'Districts',
            pollingStations: 'Polling Stations',
            candidate: 'Candidate',
            votes: 'Votes',
            percentage: 'Percentage',
            detectedAnomalies: 'Detected Anomalies',
            status: 'Status',
            actions: 'Actions',
            all: 'All regions',
            exportTitle: 'Export Results',
            exportFormat: 'Export Format',
            exportRegion: 'Region to Export',
            detailedResults: 'Detailed Results',
            byRegion: 'By Region',
            byDepartment: 'By Department',
            byDistrict: 'By District',
            anomalyType: 'Anomaly Type',
            anomalyLocation: 'Location',
            anomalyDescription: 'Description',
            resolveAnomaly: 'Resolve',
            pendingValidation: 'Pending Validation',
            validated: 'Validated',
            rejected: 'Rejected',

            resultsSummary: {
                resultsByCandidate: 'Results by Candidate',
                voteDistribution: 'Vote Distribution',
                summaryCharts: 'Summary Charts',
                votesCount: 'Vote Count',
                percentageOfVotes: 'Percentage of Votes',
                validVotesPercentage: 'Valid Votes Percentage',
                totalValidVotes: 'Total Valid Votes',
                totalInvalidVotes: 'Total Invalid Votes',
                totalBlankVotes: 'Total Blank Votes',
                participationRate: 'Participation Rate',
                votersCount: 'Voters Count',
                
                tooltips: {
                    votes: 'Votes',
                    percentage: 'Percentage',
                    candidate: 'Candidate',
                    total: 'Total'
                }
            }
        
        },

      // Poll Workers page
        pollWorkers: {
            searchScrutateurs: "Search poll workers...",
            addScrutateur: "Add poll worker",
            name: "Name",
            email: "Email",
            phone: "Phone",
            pollingStation: "Polling station",
            selectPollingStation: "Select polling station",
            save: "Save",
            cancel: "cancel",
            actions: "Actions",
            username: "Username",
            password: "Password",
            votingCenter: "Voting center",
            selectVotingCenter: "Select voting center"
        }
    }
};