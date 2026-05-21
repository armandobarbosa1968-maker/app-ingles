Os sons da aplicação são gerados em tempo real pela Web Audio API
(ver lib/sounds.ts), por isso não são necessários ficheiros .mp3 nesta pasta.

Se quiseres usar sons gravados, coloca aqui ficheiros como:
  - acerto.mp3
  - erro.mp3
  - vitoria.mp3
  - click.mp3

e substitui as funções em lib/sounds.ts por <audio> tags ou
new Audio('/sounds/acerto.mp3').play().
