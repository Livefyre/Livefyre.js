livefyre('''
deploy:
  branch: "^(rc|staging|production)$"
  image:
    label: corpjenkins/node
  confirm: true
  commands:
    - make clean dist
  lfcdn:
    build: ${currentBuild.startTimeInMillis}
''')
