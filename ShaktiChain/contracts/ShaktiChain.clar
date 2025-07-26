;; Declare a contract to manage report tracking and STX payments
(define-data-var report-count uint u0)
(define-data-var reports (map uint (tuple (sender principal) (rewarded bool))) {})

;; Reward amount (e.g. 0.01 STX = 1_000_000 micro STX)
(define-constant reward u1000000)

;; Submit a new report
(define-public (submit-report)
  (let (
    (sender tx-sender)
    (current-id (var-get report-count))
  )
    (begin
      ;; Store report
      (map-set reports current-id { sender: sender, rewarded: false })
      ;; Increment report count
      (var-set report-count (+ current-id u1))
      (ok current-id)
    )
  )
)

;; Validate report and reward the user
(define-public (validate-report (report-id uint))
  (let (
    (maybe-report (map-get? reports report-id))
  )
    (match maybe-report report
      (begin
        ;; Ensure it hasn't already been rewarded
        (if (is-eq (get rewarded report) true)
          (err u100) ;; Already rewarded
          (begin
            ;; Send reward from org to the user
            (try! (stx-transfer? reward tx-sender (get sender report)))
            ;; Update reward status
            (map-set reports report-id { sender: (get sender report), rewarded: true })
            (ok true)
          )
        )
      )
      (err u404) ;; Report not found
    )
  )
)

;; Read report details (read-only)
(define-read-only (get-report (report-id uint))
  (map-get? reports report-id)
)

;; Get number of reports submitted
(define-read-only (get-report-count)
  (var-get report-count)
)
