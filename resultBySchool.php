<?php
    
?>

<!DOCTYPE html>
<html lang="th">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>ผลการแข่งขัน</title>
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css" integrity="sha512-mSYUmp1HYZDFaVKK//63EcZq4iFWFjxSL+Z3T/aCt4IO9Cejm03q3NKKYN6pFQzY0SBOr8h+eCIAZHPXcpZaNw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-timepicker/1.13.18/jquery.timepicker.min.css" integrity="sha512-GgUcFJ5lgRdt/8m5A0d0qEnsoi8cDoF0d6q+RirBPtL423Qsj5cI9OxQ5hWvPi5jjvTLM/YhaaFuIeWCLi6lyQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" />
        <link rel="stylesheet" href="css/style.css?v1" />
	</head>
	<body>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-lg-6 offset-lg-3" aria-labelledby="modalResultBySchoolLabel">
                    <div class="table-responsive-md overflow-scroll" style="max-height:90vh;">
                        <table id="table-result-by-school" data-school-id="<?php echo $_REQUEST['school_id']; ?>" class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th class="text-center">#</th>
                                <th class="text-center">ชื่อ-นามสกุล</th>
                                <th class="text-center">ตำแหน่ง</th>
                                <th class="text-center">หมายเลขบิบ</th>
                                <th class="text-center">ระยะทางรวม</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- data -->
                        </tbody>
                        </table>
                    </div>
                </div>                
            </div>
        </div>

        <!-- ModalPersonalResult -->
        <div class="modal fade" id="modalPersonalResult" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalPersonalResultLabel" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen-md-down modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalPersonalResultLabel">&nbsp;</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row justify-content-center">
                            <div class="col-4">
                                <img src="assets/no-profile.png" class="img-fluid" alt="">
                            </div>
                            <div class="col-7">
                                <label class="form-label">ชื่อ-นามสกุล</label>
                                <input type="text" name="user_name" class="form-control" disabled value="">
                                <label class="form-label mt-2">หมายเลขบิบ</label>
                                <input type="text" name="bib_number" class="form-control" disabled value="">
                            </div>
                        </div>
                        <div class="col-8 offset-2 mt-4">
                            <canvas id="chart"></canvas>
                        </div>
                        <!-- Image Log -->
                    </div>
                </div>
            </div>
        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>        
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js" integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js" integrity="sha512-T/tUfKSV1bihCnd+MxKD0Hm1uBBroVYBOYSk1knyvQ9VyZJpc/ALb4P0r6ubwVPSGB2GvjeoMAJJImBG12TiaQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>        
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-timepicker/1.13.18/jquery.timepicker.min.js" integrity="sha512-WHnaxy6FscGMvbIB5EgmjW71v5BCQyz5kQTcZ5iMxann3HczLlBHH5PQk7030XmmK5siar66qzY+EJxKHZTPEQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src="js/utility.js?v1"></script>
        <script src="js/result.js?v1"></script>
	</body>
</html>