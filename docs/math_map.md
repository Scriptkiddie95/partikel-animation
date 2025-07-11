# 📊 math\_map.md – Wellenbasierte Steuerung für Partikel-Aufbauanimation

## 🎯 Ziel

Diese Datei definiert alle mathematischen Gleichungen zur Steuerung der Partikelbewegung bei der Textbildung aus der Umgebung. Sie ist das **Herzstück der Animation**, da sie bestimmt, *wie* sich die Partikel bewegen, bis sie ihren Zieltext formen. Die Bewegung basiert auf zentrierten Wellenfunktionen, Gravitationseffekten und Dämpfungsmodellen.

Die gesamte Website „entsteht“ – **nicht durch Text-Fade-in**, sondern durch **sich sammelnde Partikel**, gesteuert durch **dynamische mathematische Felder**.

---

## 📘 Vorwort

Wir verwenden mehrere Gleichungsvarianten zur Experimentierung, doch am Ende wird eine **Muttergleichung** als Standardmodell verwendet.

Alle Gleichungen werden in zwei Formaten bereitgestellt:

- **LaTeX** (für GPT / Codex / PDF / md-Dokumente)
- **Python** (für Parser, Simulation, Realzeitoptimierung)

---

## 🔢 Hauptgleichungen

### 1. Invertierte Radialwelle (Standardmodell)

#### 🧮 LaTeX

```latex
z(x, y, t) = A \cdot \sin\left(k \cdot \sqrt{(x - x_0)^2 + (y - y_0)^2} - \omega t \right) \cdot e^{-\alpha t}
```

#### 🐍 Python

```python
def wave_inward(x, y, t, A=1.0, k=0.1, omega=2.0, alpha=0.05, x0=0, y0=0):
    r = ((x - x0)**2 + (y - y0)**2)**0.5
    return A * math.sin(k * r - omega * t) * math.exp(-alpha * t)
```

### 2. Gravitationell zentrierte Soglinie (Konvergenzstrahl)

#### 🧮 LaTeX

```latex
\vec{v}(x, y) = - \gamma \cdot \frac{\vec{r}}{\|\vec{r}\|^2 + \epsilon}
```

#### 🐍 Python

```python
def gravitational_pull(x, y, gamma=4.0, epsilon=0.01, x0=0, y0=0):
    dx = x - x0
    dy = y - y0
    r2 = dx**2 + dy**2 + epsilon
    return (-gamma * dx / r2, -gamma * dy / r2)
```

### 3. Zeitmodulierte Einströmung (Modulierte Synchronisierung)

#### 🧮 LaTeX

```latex
z(x, y, t) = A \cdot \sin(k \cdot r - \omega t^{\beta}) \cdot e^{-\alpha t}
```

#### 🐍 Python

```python
def wave_time_warped(x, y, t, A=1.0, k=0.1, omega=2.0, alpha=0.05, beta=1.2, x0=0, y0=0):
    r = ((x - x0)**2 + (y - y0)**2)**0.5
    return A * math.sin(k * r - omega * t**beta) * math.exp(-alpha * t)
```

---

## 🧬 Muttergleichung (kombiniert Gravitation & Welle)

#### 🧮 LaTeX

```latex
z(x, y, t) = \left[ A \cdot \sin\left(k \cdot r - \omega t \right) + \frac{\gamma}{r^2 + \epsilon} \right] \cdot e^{-\alpha t}
```

#### 🐍 Python

```python
def mother_wave(x, y, t, A=1.0, k=0.1, omega=2.0, alpha=0.05, gamma=3.0, epsilon=0.1, x0=0, y0=0):
    dx = x - x0
    dy = y - y0
    r = math.sqrt(dx**2 + dy**2)
    wave = A * math.sin(k * r - omega * t)
    gravity = gamma / (r**2 + epsilon)
    return (wave + gravity) * math.exp(-alpha * t)  # scalar amplitude
```

---

## 🔗 Verwendung in Agenten

```markdown
- use: math_map.md
- function: mother_wave
- applicableTo: [canvas.agent.md, scroll.agent.md, burst.agent.md]
```

---

## 📍 Status

**v1.0 Modular & Operational** – kombinierbar mit Textmasken & Koordinaten aus `textflow.prompt.md`

> Nächster Schritt: Echtzeit-Debug-Modus in der `ParticleCanvas` mit Gleichungs-Overlay.

