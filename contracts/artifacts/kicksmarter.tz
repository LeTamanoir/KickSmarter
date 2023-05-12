{ parameter
    (or (unit %clean)
        (pair %postProject
           (pair (pair (mutez %currentPrice) (nat %dueDate))
                 (map %investors address nat)
                 (string %metadata))
           (pair (list %milestones
                    (pair (pair (nat %dueDate) (string %metadata)) (nat %requiredAmount) (nat %startDate)))
                 (nat %startDate))
           (nat %targetPrice))) ;
  storage
    (pair (pair (big_map %investors
                   address
                   (pair (pair (nat %nbFakeInvestments) (nat %nbRealInvestments)) (nat %rating)))
                (big_map %projectMakers
                   address
                   (pair (pair (nat %nbFakeProjects) (nat %nbRealProjects)) (nat %rating))))
          (big_map %projects
             address
             (list (pair (pair (pair (mutez %currentPrice) (nat %dueDate))
                               (map %investors address nat)
                               (string %metadata))
                         (pair (list %milestones
                                  (pair (pair (nat %dueDate) (string %metadata)) (nat %requiredAmount) (nat %startDate)))
                               (nat %startDate))
                         (nat %targetPrice))))) ;
  code { UNPAIR ;
         IF_LEFT
           { DROP 2 ;
             EMPTY_BIG_MAP
               address
               (list (pair (pair (pair mutez nat) (map address nat) string)
                           (pair (list (pair (pair nat string) nat nat)) nat)
                           nat)) ;
             EMPTY_BIG_MAP address (pair (pair nat nat) nat) ;
             EMPTY_BIG_MAP address (pair (pair nat nat) nat) ;
             PAIR ;
             PAIR }
           { SENDER ;
             DUP 3 ;
             DUP 4 ;
             CDR ;
             DIG 4 ;
             CDR ;
             DUP 4 ;
             GET ;
             IF_NONE
               { NIL (pair (pair (pair mutez nat) (map address nat) string)
                           (pair (list (pair (pair nat string) nat nat)) nat)
                           nat) }
               {} ;
             DIG 4 ;
             CONS ;
             SOME ;
             DIG 3 ;
             UPDATE ;
             UPDATE 2 } ;
         NIL operation ;
         PAIR } }

