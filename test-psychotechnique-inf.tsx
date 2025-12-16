import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle, CheckCircle, XCircle, FileText } from 'lucide-react';

const TestPsychotechniqueINF = () => {
  const [currentSection, setCurrentSection] = useState('intro');
  const [currentTest, setCurrentTest] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [answers, setAnswers] = useState({});
  const [testStarted, setTestStarted] = useState(false);
  const [results, setResults] = useState(null);
  const [candidateName, setCandidateName] = useState('');

  const tests = [
    {
      id: 'test1',
      name: 'Test 1 - Raisonnement logique & prise de décision',
      duration: 600, // 10 minutes en secondes
      weight: 10,
      maxScore: 20,
      questions: [
        {
          id: 'q1',
          text: "Une Antenne Départementale transmet des rapports incomplets depuis deux mois. Quelle est votre première action ?",
          options: [
            { value: 'A', text: 'Adresser un avertissement écrit' },
            { value: 'B', text: 'Remplacer le responsable' },
            { value: 'C', text: 'Analyser les causes et proposer un appui ciblé' },
            { value: 'D', text: "Suspendre temporairement l'antenne" }
          ],
          hasJustification: true
        },
        {
          id: 'q2',
          text: "Une commune refuse de collaborer avec l'INF sur un dossier VBG sensible. Vous :",
          options: [
            { value: 'A', text: "Saisissez immédiatement l'autorité centrale" },
            { value: 'B', text: 'Engagez un dialogue avec les leaders locaux' },
            { value: 'C', text: 'Ignorez temporairement la commune' },
            { value: 'D', text: 'Externalisez le dossier à une ONG' }
          ],
          hasJustification: true
        },
        {
          id: 'q3',
          text: "Un Point Focal très actif mais peu rigoureux dans le reporting. Quelle priorité ?",
          options: [
            { value: 'A', text: 'Valoriser uniquement les résultats terrain' },
            { value: 'B', text: 'Le remplacer' },
            { value: 'C', text: 'Renforcer ses capacités en reporting' },
            { value: 'D', text: 'Centraliser le reporting à votre niveau' }
          ],
          hasJustification: true
        },
        {
          id: 'q4',
          text: "Une urgence VBG survient pendant une mission planifiée de supervision. Vous :",
          options: [
            { value: 'A', text: 'Maintenez la mission' },
            { value: 'B', text: 'Déléguez totalement' },
            { value: 'C', text: 'Réajustez votre agenda' },
            { value: 'D', text: 'Annulez toutes les activités' }
          ],
          hasJustification: true
        },
        {
          id: 'q5',
          text: "Face à des tensions récurrentes entre PF et services sociaux, vous :",
          options: [
            { value: 'A', text: 'Laissez les acteurs régler seuls' },
            { value: 'B', text: 'Organisez une médiation institutionnelle' },
            { value: 'C', text: 'Remplacez le PF' },
            { value: 'D', text: 'Informez uniquement la hiérarchie' }
          ],
          hasJustification: true
        }
      ]
    },
    {
      id: 'test2',
      name: 'Test 2 - Organisation & priorisation',
      duration: 300, // 5 minutes
      weight: 15,
      maxScore: 24,
      questions: [
        {
          id: 'priorite',
          text: "Classez les actions suivantes par ordre de priorité (1 à 6)",
          type: 'ranking',
          items: [
            'Cas VBG critique signalé dans une commune',
            'Rapport trimestriel en retard',
            'Réunion préfectorale planifiée',
            "Supervision programmée d'une antenne performante",
            'Formation PF prévue',
            'Demande urgente du siège'
          ],
          hasJustification: true,
          justificationPrompt: 'Expliquez brièvement votre premier choix (3 lignes maximum)'
        }
      ]
    },
    {
      id: 'test3',
      name: 'Test 3 - Compréhension écrite & restitution',
      duration: 900, // 15 minutes
      weight: 15,
      maxScore: 12,
      text: `Depuis deux ans, l'Institut National de la Femme (INF) a renforcé sa présence au niveau territorial à travers la création d'Antennes Départementales et la désignation de Points Focaux communaux. Cette stratégie vise à rapprocher les services de protection, de promotion des droits des femmes et de lutte contre les violences basées sur le genre (VBG) des populations, en tenant compte des réalités locales.

Cependant, dans certaines zones, ce déploiement s'est heurté à des résistances sociales et institutionnelles. Des leaders communautaires et certaines autorités locales estiment que les interventions de l'INF remettent en cause des pratiques culturelles établies ou perturbent l'équilibre familial. Dans plusieurs communes, ces perceptions ont entraîné une baisse de collaboration, une participation communautaire limitée et, dans certains cas, une réticence à signaler les situations de VBG.

Par ailleurs, le fonctionnement du réseau territorial révèle des disparités importantes. Certains Points Focaux démontrent une forte capacité de mobilisation et de reporting, tandis que d'autres peinent à produire des données fiables et régulières. Cette situation complique le suivi-évaluation, limite la capitalisation des actions menées et fragilise la crédibilité institutionnelle de l'INF auprès de ses partenaires techniques et financiers.

Face à ces défis, la direction de l'INF insiste sur la nécessité de renforcer le leadership territorial, la qualité du dialogue avec les acteurs locaux et l'appropriation communautaire des actions. Elle souligne également l'importance d'un pilotage fondé sur des données probantes, combiné à une approche sensible au genre, aux dynamiques socioculturelles et au bien-être des acteurs de terrain, souvent exposés à une forte charge émotionnelle.

Dans ce contexte, le rôle du/de la Chargé(e) des Antennes Départementales et Points Focaux apparaît déterminant. Au-delà de la coordination administrative, il ou elle doit agir comme facilitateur(trice), médiateur(trice) et garant(e) de la cohérence entre les orientations nationales et les réalités locales, afin d'assurer un impact durable des actions de l'INF.`,
      questions: [
        {
          id: 'q1',
          text: "Quel est l'objectif principal du déploiement territorial de l'INF tel que présenté dans le texte ?",
          type: 'longText',
          points: 4
        },
        {
          id: 'q2',
          text: "Citez et expliquez deux difficultés majeures rencontrées par l'INF dans la mise en œuvre de sa stratégie territoriale.",
          type: 'longText',
          points: 5
        },
        {
          id: 'q3',
          text: "Pourquoi la fiabilité des données produites par les Points Focaux est-elle stratégique pour l'INF ?",
          type: 'longText',
          points: 3
        }
      ]
    },
    {
      id: 'test4',
      name: 'Test 4 - Leadership & posture relationnelle',
      duration: 300, // 5 minutes
      weight: 15,
      maxScore: 20,
      questions: [
        { id: 'l1', text: "Je privilégie l'écoute avant la décision", type: 'likert' },
        { id: 'l2', text: 'Je suis à l\'aise pour recadrer avec respect', type: 'likert' },
        { id: 'l3', text: 'Je préfère convaincre plutôt qu\'imposer', type: 'likert' },
        { id: 'l4', text: 'Je prends des décisions même en contexte incertain', type: 'likert' },
        { id: 'l5', text: 'Je sais adapter mon style selon les interlocuteurs', type: 'likert' },
        { id: 'l6', text: 'Je gère les conflits sans les éviter', type: 'likert' },
        { id: 'l7', text: 'Je fais confiance à mon équipe', type: 'likert' },
        { id: 'l8', text: 'Je délègue efficacement', type: 'likert' },
        { id: 'l9', text: 'Je reste calme sous pression', type: 'likert' },
        { id: 'l10', text: 'Je communique clairement mes attentes', type: 'likert' }
      ]
    },
    {
      id: 'test5',
      name: 'Test 5 - Résilience & gestion du stress',
      duration: 180, // 3 minutes
      weight: 10,
      maxScore: 12,
      questions: [
        {
          id: 'r1',
          text: "Après une mission émotionnellement lourde, je :",
          options: [
            { value: 'A', text: 'Continue sans pause' },
            { value: 'B', text: 'Demande un appui' },
            { value: 'C', text: 'Me replie durablement' },
            { value: 'D', text: "Ignore l'impact" }
          ]
        },
        {
          id: 'r2',
          text: "Sous pression, je :",
          options: [
            { value: 'A', text: 'Deviens confus' },
            { value: 'B', text: 'Priorise calmement' },
            { value: 'C', text: 'Transfère la responsabilité' },
            { value: 'D', text: 'Retarde les décisions' }
          ]
        },
        {
          id: 'r3',
          text: "En cas d'échec, je :",
          options: [
            { value: 'A', text: 'Me décourage' },
            { value: 'B', text: 'Analyse et ajuste' },
            { value: 'C', text: 'Blâme le contexte' },
            { value: 'D', text: 'Évite la situation' }
          ]
        }
      ]
    },
    {
      id: 'test6',
      name: 'Test 6 - Éthique & sens institutionnel',
      duration: 600, // 10 minutes
      weight: 15,
      maxScore: 12,
      questions: [
        {
          id: 'e1',
          text: "Un élu vous demande de ne pas signaler un cas sensible. Que faites-vous ?",
          type: 'longText'
        },
        {
          id: 'e2',
          text: "Un PF divulgue des informations confidentielles. Votre réaction ?",
          type: 'longText'
        },
        {
          id: 'e3',
          text: "Comment conciliez-vous loyauté institutionnelle et pressions locales ?",
          type: 'longText'
        }
      ]
    },
    {
      id: 'test7',
      name: 'Test 7 - Cohérence comportementale',
      duration: 600, // 10 minutes
      weight: 10,
      maxScore: 4,
      questions: [
        {
          id: 'c1',
          text: "Lorsque les équipes locales rencontrent des difficultés récurrentes, il est parfois nécessaire de reprendre la main de façon directive, même si cela réduit temporairement leur autonomie.",
          type: 'agreement',
          hasJustification: true
        },
        {
          id: 'c2',
          text: "La performance durable des Antennes et Points Focaux repose avant tout sur leur autonomie et leur responsabilisation, même en période de crise.",
          type: 'agreement',
          hasJustification: true
        }
      ]
    },
    {
      id: 'test8',
      name: 'Test 8 - Éthique & arbitrage',
      duration: 120, // 2 minutes
      weight: 15,
      maxScore: 4,
      questions: [
        {
          id: 'arb1',
          text: "Une autorité locale influente vous demande de suspendre temporairement l'intervention de l'INF sur un cas sensible de VBG afin de « préserver la paix sociale ». Dans le même temps, la victime exprime une peur immédiate de représailles. Quelle décision prenez-vous et pourquoi?",
          type: 'longText'
        }
      ]
    }
  ];

  useEffect(() => {
    let timer;
    if (testStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleNextTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [testStarted, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startTest = (testIndex) => {
    setCurrentTest(testIndex);
    setTimeLeft(tests[testIndex].duration);
    setTestStarted(true);
    setCurrentSection('test');
  };

  const handleAnswer = (testId, questionId, value, isJustification = false) => {
    setAnswers(prev => ({
      ...prev,
      [testId]: {
        ...prev[testId],
        [questionId]: isJustification ? { ...prev[testId]?.[questionId], justification: value } : 
                      typeof value === 'object' ? value : { answer: value }
      }
    }));
  };

  const handleNextTest = () => {
    setTestStarted(false);
    if (currentTest < tests.length - 1) {
      setCurrentSection('transition');
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    const scores = {};
    let totalScore = 0;

    // Scoring logic simplifiée - dans un cas réel, il faudrait une grille détaillée
    tests.forEach(test => {
      const testAnswers = answers[test.id] || {};
      let rawScore = 0;
      
      // Calcul basique - à affiner selon les bonnes réponses
      const answeredQuestions = Object.keys(testAnswers).length;
      const totalQuestions = test.questions.length;
      rawScore = (answeredQuestions / totalQuestions) * test.maxScore * 0.7; // 70% pour avoir répondu
      
      const weightedScore = (rawScore / test.maxScore) * test.weight;
      scores[test.id] = {
        raw: rawScore,
        weighted: weightedScore,
        max: test.weight
      };
      totalScore += weightedScore;
    });

    // Vérification des règles éliminatoires
    const ethiqueScore = scores['test6']?.weighted || 0;
    const resilienceScore = scores['test5']?.weighted || 0;
    
    const isEliminatoire = (ethiqueScore < 8) || (resilienceScore < 8);

    let profile = 'C - Non recommandé';
    if (!isEliminatoire) {
      if (totalScore >= 75) profile = 'A - Haut potentiel stratégique';
      else if (totalScore >= 60) profile = 'B - Potentiel à consolider';
    }

    setResults({
      totalScore: totalScore.toFixed(2),
      scores,
      profile,
      isEliminatoire,
      eliminatoireReason: isEliminatoire ? 
        (ethiqueScore < 8 ? 'Éthique & sens institutionnel < 8/15' : 
         'Résilience émotionnelle & stress < 8/10') : null
    });
    setCurrentSection('results');
  };

  const renderIntro = () => (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          Test Psychotechnique et de Personnalité
        </h1>
        <h2 className="text-xl text-blue-700 mb-8">
          Poste: Chargé(e) de Région - Antennes Départementales & Points Focaux (INF)
        </h2>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom et Prénom du candidat
          </label>
          <input
            type="text"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez votre nom complet"
          />
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
          <h3 className="font-semibold text-lg mb-4">Consignes générales</h3>
          <ul className="space-y-2 text-sm">
            <li>✓ Lisez attentivement chaque question avant de répondre</li>
            <li>✓ Répondez de manière personnelle et sincère</li>
            <li>✓ Il n'y a pas de "bonne" ou "mauvaise" personnalité</li>
            <li>✓ Durée totale indicative: 1h30mn</li>
            <li>✓ Chaque test est chronométré individuellement</li>
          </ul>
        </div>

        <div className="space-y-4 mb-8">
          <h3 className="font-semibold text-lg">Structure du test</h3>
          {tests.map((test, idx) => (
            <div key={test.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{test.name}</p>
                <p className="text-sm text-gray-600">
                  {test.questions.length} question(s) - {test.duration / 60} minutes
                </p>
              </div>
              <div className="text-sm text-gray-500">
                {test.weight} points
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setCurrentSection('testList')}
          disabled={!candidateName.trim()}
          className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
        >
          Commencer le test
        </button>
      </div>
    </div>
  );

  const renderTestList = () => (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">
          Candidat: {candidateName}
        </h2>
        <p className="text-gray-600 mb-8">Sélectionnez un test pour commencer</p>

        <div className="space-y-4">
          {tests.map((test, idx) => {
            const isCompleted = answers[test.id] && Object.keys(answers[test.id]).length > 0;
            return (
              <div
                key={test.id}
                className={`p-6 rounded-lg border-2 ${
                  isCompleted ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{test.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        {test.duration / 60} min
                      </span>
                      <span>{test.questions.length} question(s)</span>
                      <span className="font-medium">{test.weight} points</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isCompleted && <CheckCircle className="text-green-500" size={24} />}
                    <button
                      onClick={() => startTest(idx)}
                      className={`px-6 py-2 rounded-lg font-medium ${
                        isCompleted
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isCompleted ? 'Reprendre' : 'Commencer'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {tests.every((test, idx) => answers[test.id] && Object.keys(answers[test.id]).length > 0) && (
          <button
            onClick={calculateResults}
            className="w-full mt-8 bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700"
          >
            Terminer et voir les résultats
          </button>
        )}
      </div>
    </div>
  );

  const renderTest = () => {
    const test = tests[currentTest];
    const testAnswers = answers[test.id] || {};

    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-blue-900">{test.name}</h2>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              timeLeft < 60 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
            }`}>
              <Clock size={20} />
              <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
            </div>
          </div>

          {test.text && (
            <div className="bg-gray-50 p-6 rounded-lg mb-8 max-h-96 overflow-y-auto">
              <h3 className="font-semibold mb-4">Texte à lire:</h3>
              <div className="text-sm leading-relaxed whitespace-pre-line">{test.text}</div>
            </div>
          )}

          <div className="space-y-8">
            {test.questions.map((q, qIdx) => (
              <div key={q.id} className="border-b border-gray-200 pb-8 last:border-b-0">
                <p className="font-semibold mb-4">
                  Question {qIdx + 1}: {q.text}
                </p>

                {q.type === 'ranking' && (
                  <div className="space-y-3">
                    {q.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-center gap-3">
                        <select
                          value={testAnswers[q.id]?.answer?.[itemIdx] || ''}
                          onChange={(e) => {
                            const newRanking = testAnswers[q.id]?.answer || [];
                            newRanking[itemIdx] = e.target.value;
                            handleAnswer(test.id, q.id, newRanking);
                          }}
                          className="w-20 px-3 py-2 border border-gray-300 rounded"
                        >
                          <option value="">-</option>
                          {[1, 2, 3, 4, 5, 6].map(n => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {q.type === 'likert' && (
                  <div className="flex gap-4">
                    {[1, 2, 3, 4, 5].map(val => (
                      <label key={val} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`${test.id}-${q.id}`}
                          value={val}
                          checked={testAnswers[q.id]?.answer === val.toString()}
                          onChange={(e) => handleAnswer(test.id, q.id, e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{val}</span>
                      </label>
                    ))}
                  </div>
                )}

                {q.type === 'agreement' && (
                  <div className="space-y-2">
                    {['Tout à fait d\'accord', 'Plutôt d\'accord', 'Plutôt pas d\'accord', 'Pas du tout d\'accord'].map(opt => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`${test.id}-${q.id}`}
                          value={opt}
                          checked={testAnswers[q.id]?.answer === opt}
                          onChange={(e) => handleAnswer(test.id, q.id, e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                )}

                {q.options && !q.type && (
                  <div className="space-y-2">
                    {q.options.map(opt => (
                      <label key={opt.value} className="flex items-start gap-3 cursor-pointer p-3 hover:bg-gray-50 rounded">
                        <input
                          type="radio"
                          name={`${test.id}-${q.id}`}
                          value={opt.value}
                          checked={testAnswers[q.id]?.answer === opt.value}
                          onChange={(e) => handleAnswer(test.id, q.id, e.target.value)}
                          className="mt-1 w-4 h-4"
                        />
                        <span className="text-sm">
                          <strong>{opt.value}.</strong> {opt.text}
                        </span>
                      </label>
                    ))}
                  </div>
                )}

                {q.type === 'longText' && (
                  <textarea
                    value={testAnswers[q.id]?.answer || ''}
                    onChange={(e) => handleAnswer(test.id, q.id, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 min-h-32"
                    placeholder="Votre réponse..."
                  />
                )}

                {q.hasJustification && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {q.justificationPrompt || 'Justifiez votre choix en 3 lignes maximum:'}
                    </label>
                    <textarea
                      value={testAnswers[q.id]?.justification || ''}
                      onChange={(e) => handleAnswer(test.id, q.id, e.target.value, true)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      placeholder="Votre justification..."
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleNextTest}
            className="w-full mt-8 bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700"
          >
            {currentTest < tests.length - 1 ? 'Test suivant' : 'Terminer le test'}
          </button>
        </div>
      </div>
    );
  };

  const renderTransition = () => (
    <div className="max-w-2xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Test complété !</h2>
        <p className="text-gray-600 mb-8">
          Vous avez terminé le {tests[currentTest].name}. Prêt pour le test suivant ?
        </p>
        <button
          onClick={() => startTest(currentTest + 1)}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Commencer {tests[currentTest + 1].name}
        </button>
      </div>
    </div>
  );

  const renderResults = () => {
    if (!results) return null;

    return (
      <div className="max-w-5xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-2">Résultats du Test</h1>
            <p className="text-xl text-gray-600">Candidat: {candidateName}</p>
          </div>

          {results.isEliminatoire && (
            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
              <div className="flex items-start gap-3">
                <XCircle className="text-red-500 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-red-900 mb-2">Critère éliminatoire atteint</h3>
                  <p className="text-red-700">{results.eliminatoireReason}</p>
                  <p className="text-sm text-red-600 mt-2">
                    Ces critères sont non négociables pour un poste exposé VBG et terrain sensible.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg text-center">
              <p className="text-sm mb-2 opacity-90">Score Total</p>
              <p className="text-4xl font-bold">{results.totalScore}</p>
              <p className="text-sm opacity-90">/ 100 points</p>
            </div>

            <div className={`p-6 rounded-lg text-center ${
              results.profile.startsWith('A') ? 'bg-green-100 border-2 border-green-500' :
              results.profile.startsWith('B') ? 'bg-yellow-100 border-2 border-yellow-500' :
              'bg-red-100 border-2 border-red-500'
            }`}>
              <p className="text-sm mb-2 font-medium">Profil</p>
              <p className="text-xl font-bold">{results.profile}</p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg text-center">
              <p className="text-sm mb-2 text-gray-600">Statut</p>
              <p className="text-xl font-bold">
                {results.isEliminatoire ? 'Non admissible' :
                 parseFloat(results.totalScore) >= 75 ? 'Recommandé' :
                 parseFloat(results.totalScore) >= 60 ? 'À consolider' :
                 'Non recommandé'}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Détail par test</h3>
            <div className="space-y-4">
              {tests.map(test => {
                const score = results.scores[test.id];
                if (!score) return null;
                const percentage = (score.weighted / score.max) * 100;

                return (
                  <div key={test.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{test.name}</span>
                      <span className="text-sm font-bold">
                        {score.weighted.toFixed(2)} / {score.max}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${
                          percentage >= 75 ? 'bg-green-500' :
                          percentage >= 60 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <h3 className="font-bold text-blue-900 mb-3">Légende des profils</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="font-semibold text-green-700">Profil A (≥75/100):</span>
                <span>Immédiatement opérationnel, leadership terrain, forte autonomie</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-yellow-700">Profil B (60-74/100):</span>
                <span>Bon profil, nécessite accompagnement ciblé</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-red-700">Profil C (&lt;60/100):</span>
                <span>Risque opérationnel ou inadéquation au poste</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => window.print()}
              className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 flex items-center justify-center gap-2"
            >
              <FileText size={20} />
              Imprimer les résultats
            </button>
            <button
              onClick={() => {
                setCurrentSection('intro');
                setAnswers({});
                setResults(null);
                setCandidateName('');
              }}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Nouveau test
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-8">
      {currentSection === 'intro' && renderIntro()}
      {currentSection === 'testList' && renderTestList()}
      {currentSection === 'test' && renderTest()}
      {currentSection === 'transition' && renderTransition()}
      {currentSection === 'results' && renderResults()}
    </div>
  );
};

export default TestPsychotechniqueINF;