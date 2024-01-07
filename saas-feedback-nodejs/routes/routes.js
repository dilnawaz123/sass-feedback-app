const express = require('express');
const axios = require('axios').default;
const router = express.Router();
const CacheService = require('../services/redis-cache')
const canAccess = require('../services/canAccess')
const partnerController = require('../controllers/partnerController');
const admissionTokenController = require("../controllers/admissionTokenController");
const globalSettingController = require('../controllers/globalSetting')
const AWSBucketController = require('../controllers/aws-bucket')
const userController = require('../controllers/userController')
const kmsController = require('../controllers/kms')
const APIResponse = require('../ApiResponse')
const tokenChecker = require('../verifyToken')
const memberController = require('../controllers/memberController');
const deviceController = require('../controllers/deviceController');
const fileImporExportController = require('../controllers/fileImportExportController');
const partnerContractController = require('../controllers/partnerContractController')
const elasticsearchController = require('../controllers/elasticsearch')
const receipttemplateController = require('../controllers/receipttemplateController')
const authenticateController = require('../controllers/authenticate')
const { readuser } = require('../models/mongoSchemas/user')
const commonController = require('../controllers/commonController');
const { readGS } = require('../models/mongoSchemas/globalSetting');
const reportQueueController = require('../controllers/reportQueueController')
const thirdPartyCouponController = require('../controllers/thirdPartyCoupons')
const clientDataFixerController = require('../controllers/clientDataFixer')
const partnerCardController = require('../controllers/partnerCardController');
const LoungeMembershipRegistrations = require('../controllers/LoungeMembershipRegistrations');

require('dotenv').config()

router.use('/api/master/node/memory/usage', (req, res, next) => {
    res.send(process.memoryUsage())
})

router.post('/api/master/user/authenticate', authenticateController.authenticateUser)
router.post('/api/master/user/logout', tokenChecker.verifyToken, authenticateController.logout)
router.post('/api/master/user/outlet/change', tokenChecker.verifyToken, authenticateController.changeUserOutlet)
router.post('/api/master/user/language/change', tokenChecker.verifyToken, authenticateController.changeUserLanguage)
router.post('/api/master/user/outlet/fetch', tokenChecker.verifyToken, authenticateController.getUserLounges)
router.post('/api/master/user/profile', tokenChecker.verifyToken, authenticateController.getuserDetails)

// global routes
router.post('/api/master/globalSetting/fetch/lookupCode', globalSettingController.fetchFromLookupCode)

router.post('/api/master/globalSetting/fetch/lookupCode', globalSettingController.fetchGSNames)
// router.post('/api/master/globalSetting/fetch/lookupCode', canAccess, globalSettingController.fetchFromLookupCode) // No Auth here
router.post('/api/master/globalSetting/fetch/lookupCodeReceipt', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'GLOBAL_SETTING',
        req.body.access_action = 'SEARCH'
    next()
}, canAccess, globalSettingController.fetchFromLookupCodeReceipt)
// router.post('/api/master/country/fetch', tokenChecker.verifyToken, (req, res, next) => {
//     req.body.access_module = 'GLOBAL_SETTING',
//         req.body.access_action = 'SEARCH'
//     next()
// }, canAccess, globalSettingController.fetchAllCountries)
router.post('/api/master/country/fetch', globalSettingController.fetchAllCountries)
router.post('/api/master/globalSettings/fetchAllAirport', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'GLOBAL_SETTING',
        req.body.access_action = 'SEARCH'
    next()
}, canAccess, globalSettingController.fetchAllAirport)
router.post('/api/master/globalSettings/updateFlightRoutesInES', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'GLOBAL_SETTING',
        req.body.access_action = 'SEARCH'
    next()
}, canAccess, globalSettingController.updateFlightRoutesInES)
router.post('/api/master/globalSettings/fetchUserRoles', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'GLOBAL_SETTING',
        req.body.access_action = 'SEARCH'
    next()
}, canAccess, globalSettingController.fetchUserRoles)
router.post('/facilities/fetch', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'DEVICES',
        req.body.access_action = 'SEARCH'
    next()
}, canAccess, globalSettingController.fetchAllFacilities)


router.post('/api/master/s3/presignedURL', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'UPLOAD_PHOTOS',
        req.body.access_action = 'SAVE'
    next()
}, canAccess, AWSBucketController.getPresignedURL)




router.post('/api/master/globalSetting/fetchdata', tokenChecker.verifyToken,
    (req, res, next) => {
        req.body.access_module = 'GLOBAL_SETTING',
            req.body.access_action = 'SEARCH'
        next()
    }, canAccess, globalSettingController.fetchdata)
router.post('/api/master/globalSetting/simplesearchglobalsetting', tokenChecker.verifyToken,
    (req, res, next) => {
        req.body.access_module = 'GLOBAL_SETTING',
            req.body.access_action = 'SEARCH'
        next()
    }, canAccess, globalSettingController.simpleSearchGlobalSettingData)

router.post('/api/master/globalSetting/advancesearchglobalsetting', tokenChecker.verifyToken,
    (req, res, next) => {
        req.body.access_module = 'GLOBAL_SETTING',
            req.body.access_action = 'ADVANCE_SEARCH'
        next()
    }, canAccess, globalSettingController.advanceGlobalSettingsDataSearch)
router.post('/api/master/globalSetting/saveglobalSetting', tokenChecker.verifyToken,
    (req, res, next) => {
        req.body.access_module = 'GLOBAL_SETTING',
            req.body.access_action = 'SAVE'
        next()
    }, canAccess, globalSettingController.saveGlobalSettingsDetails)
router.post('/api/master/globalSetting/fetchglobalSetting', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'GLOBAL_SETTING',
        req.body.access_action = 'SEARCH'
    next()
}, canAccess, globalSettingController.globalsettingFetchById)
router.post('/api/master/globalSetting/advancesearch', tokenChecker.verifyToken,
    (req, res, next) => {
        req.body.access_module = 'GLOBAL_SETTING',
            req.body.access_action = 'ADVANCE_SEARCH'
        next()
    }, canAccess, globalSettingController.advanceGlobalSettingSearch)
router.post('/api/master/global/fetchGSNames', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'GLOBAL_SETTING',
        req.body.access_action = 'SEARCH'
    next()
}, canAccess, globalSettingController.fetchGSNames)

router.post('/api/master/globalSetting/fetchglobalLKCode', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'GLOBAL_SETTING',
        req.body.access_action = 'SEARCH'
    next()
}, canAccess, globalSettingController.globalsettingFetchName)
//member routes
// router.post('/api/master/member/fetchMemberData', canAccess, memberController.fetchMemberData);
// router.post('/api/master/member/simpleSearchMemberData', canAccess, memberController.simpleSearchMemberData);
// router.post('/api/master/member/getAdvanceFormInput', canAccess, memberController.getAdvanceFormInput);
// router.post('/api/master/member/advanceMemberDataSearch', canAccess, memberController.advanceMemberDataSearch);
//device routes
router.post('/api/master/device/fetchDeviceData', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'DEVICES',
        req.body.access_action = 'VIEW'
    next()
}, canAccess, deviceController.fetchDeviceData);
router.post('/api/master/device/simpleSearchDeviceData', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'DEVICES',
        req.body.access_action = 'SEARCH'
    next()
}, canAccess, deviceController.simpleSearchDeviceData);

router.post('/api/master/device/fetchLoungeNames', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'DEVICES',
        req.body.access_action = 'SEARCH'
    next()
}, canAccess, deviceController.fetchLoungeNames);
router.post('/api/master/device/createDeviceData', tokenChecker.verifyToken, tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'DEVICES',
        req.body.access_action = 'SAVE'
    next()
}, canAccess, deviceController.createDeviceData);
router.post('/api/master/device/fetch/id', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'DEVICES',
        req.body.access_action = 'EDIT'
    next()
}, canAccess, deviceController.deviceFetchById);
router.post('/api/master/device/fetchDeviceNames', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'DEVICES',
        req.body.access_action = 'SEARCH'
    next()
}, canAccess, deviceController.fetchDeviceNames);
router.post('/api/master/device/fetchLounge', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'DEVICES',
        req.body.access_action = 'SEARCH'
    next()
}, canAccess, deviceController.getLoungeName);
router.post('/api/master/device/deletedevicedata', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'DEVICES',
        req.body.access_action = 'DELETE'
    next()
}, canAccess, deviceController.deleteDevice);
router.post('/api/master/device/advanced/fetch', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'DEVICES',
        req.body.access_action = 'ADVANCE_SEARCH'
    next()
}, canAccess, deviceController.fetchDeviceAdvanced);
router.post('/api/master/device/save/import', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'DEVICES',
        req.body.access_action = 'IMPORT'
    next()
}, canAccess, deviceController.saveImportDevice);


//fileImporExport routes
router.post('/api/master/fileImportExport/fetch', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'FILE_IMPORT_EXPORT'
    req.body.access_action = 'SEARCH'
    req.body.api = '/api/master/fileImportExport/fetch'
    next()
}, canAccess, fileImporExportController.fetchFileImportExport)
router.post('/api/master/fileImportExport/search/simple', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'FILE_IMPORT_EXPORT'
    req.body.access_action = 'SEARCH'
    req.body.api = '/api/master/fileImportExport/search/simple'
    next()
}, canAccess, fileImporExportController.simpleSearch)
router.post('/api/master/fileImportExport/search/advance', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'FILE_IMPORT_EXPORT'
    req.body.access_action = 'ADVANCE_SEARCH'
    req.body.api = '/api/master/fileImportExport/search/advance'
    next()
}, canAccess, fileImporExportController.advanceSearch)
router.post('/api/master/fileImportExport/fetch/error/status', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'FILE_IMPORT_EXPORT'
    req.body.access_action = 'SEARCH'
    req.body.api = '/api/master/fileImportExport/fetch/error/status'
    next()
}, canAccess, fileImporExportController.fetchErrorStatus)
router.post('/api/master/fileImportExport/save/import', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'FILE_IMPORT_EXPORT'
    req.body.access_action = 'IMPORT'
    req.body.api = '/api/master/fileImportExport/save/import'
    next()
}, canAccess, fileImporExportController.savefileImportExport)

//partner Contract routes
router.post('/api/master/partnerContract/upsert', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'PARTNER_CONTRACT'
    req.body.access_action = 'SAVE_DRAFT'
    req.body.api = '/api/master/partnerContract/upsert'
    next()
}, canAccess, partnerContractController.upsertPartnerContract)
router.post('/api/master/partnerContract/fetch', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'PARTNER_CONTRACT'
    req.body.access_action = 'SEARCH'
    req.body.api = '/api/master/partnerContract/fetch'
    next()
}, canAccess, partnerContractController.fetchPartnerContract)
router.post('/api/master/partnerContract/fetch/id', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'PARTNER_CONTRACT'
    req.body.access_action = 'EDIT'
    req.body.api = '/api/master/partnerContract/fetch/id'
    next()
}, canAccess, partnerContractController.fetchById)
router.post('/api/master/partnerContract/token/save', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'PARTNER_CONTRACT'
    req.body.access_action = 'SAVE'
    req.body.api = '/api/master/partnerContract/token/save'
    next()
}, canAccess, partnerContractController.saveToken)
router.post('/api/master/partnerContract/submit', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'PARTNER_CONTRACT'
    req.body.access_action = 'SUBMIT'
    req.body.api = '/api/master/partnerContract/submit'
    next()
}, canAccess, partnerContractController.submitForApproval)
router.post('/api/master/partnerContract/delete', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'PARTNER_CONTRACT'
    req.body.access_action = 'DELETE'
    req.body.api = '/api/master/partnerContract/delete'
    next()
}, canAccess, partnerContractController.deletePartnerContract)
router.post('/api/master/partnerContract/extendExpiryDate', partnerContractController.extendExpiryDate)
router.post('/api/master/parterContract/approve', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'PARTNER_CONTRACT'
    req.body.access_action = 'APPROVE'
    req.body.api = '/api/master/parterContract/approve'
    next()
}, canAccess, partnerContractController.approveToken)
// router.post('/api/master/parterContract/approve', partnerContractController.approveToken)
router.post('/api/master/parterContract/reject', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'PARTNER_CONTRACT'
    req.body.access_action = 'REJECT'
    req.body.api = '/api/master/parterContract/reject'
    next()
}, canAccess, partnerContractController.rejectToken)
router.post('/api/master/parterContract/search/simple', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'PARTNER_CONTRACT'
    req.body.access_action = 'SEARCH'
    req.body.api = '/api/master/parterContract/search/simple'
    next()
}, canAccess, partnerContractController.simpleSearch)
router.post('/api/master/parterContract/search/advance', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'PARTNER_CONTRACT'
    req.body.access_action = 'ADVANCE_SEARCH'
    req.body.api = '/api/master/parterContract/search/advance'
    next()
}, canAccess, partnerContractController.advanceSearch)
router.post('/api/master/partnerContract/clone', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'PARTNER_CONTRACT'
    req.body.access_action = 'CLONE'
    req.body.api = '/api/master/partnerContract/clone'
    next()
}, canAccess, partnerContractController.cloneContract)

router.post('/api/master/partnerContract/save/import', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'PARTNER_CONTRACT'
    req.body.access_action = 'IMPORT',
        req.body.api = '/api/master/partnerContract/save/import'
    next()
}, canAccess, partnerContractController.saveImport)
router.post('/api/master/partnerContract/change/status', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'PARTNER_CONTRACT'
    req.body.access_action = 'STATUS_CHANGE'
    next()
}, canAccess, partnerContractController.toggleContractStatus)
router.post('/api/master/partnerContract/extend', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'PARTNER_CONTRACT'
    req.body.access_action = 'EXTEND'
    next()
}, canAccess, partnerContractController.extendContract)
router.post('/api/master/partnerContract/update', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'PARTNER_CONTRACT'
    req.body.access_action = 'SAVE'
    next()
}, canAccess, partnerContractController.updateContract)
router.post('/api/master/partnerContract/contract/price/save', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'PARTNER_CONTRACT'
    req.body.access_action = 'SAVE'
    next()
}, canAccess, partnerContractController.saveContractPrice)
//admission-token routes
router.post('/api/master/admissionToken/upsert', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'SAVE_DRAFT'
    next()
}, canAccess, admissionTokenController.upsertAdmissionToken)
router.post('/api/master/admissionToken/localisation/update', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'SAVE_DRAFT'
    next()
}, canAccess, admissionTokenController.updateLocalisation)
router.post('/api/master/admissionToken/delete', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'DELETE'
    next()
}, canAccess, admissionTokenController.deleteAdmissionToken)
router.post('/api/master/admissionToken/fetch', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'VIEW'
    next()
}, canAccess, admissionTokenController.fetchTokens)
router.post('/api/master/admissionToken/fetchall', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'VIEW'
    next()
}, canAccess, admissionTokenController.fetchTokensAll)
router.post('/api/master/admissionToken/id/fetch', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'VIEW'
    next()
}, canAccess, admissionTokenController.fetchTokenByID)

router.post('/api/master/admissionToken/lock', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'VIEW'
    next()
}, canAccess, admissionTokenController.lockAIByID)

router.post('/api/master/admissionToken/partner/fetch', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'VIEW'
    next()
}, canAccess, admissionTokenController.fetchPartnerTokens)

router.post('/api/master/admissionToken/id/fetchtokenforExcel', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'VIEW'
    next()
}, canAccess, admissionTokenController.fetchTokenforExcelReport)

//
router.post('/api/master/admissionToken/name/fetch', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'SEARCH'
    next()
}, canAccess, admissionTokenController.fetchTokensByName)
router.post('/api/master/admissionToken/advanced/fetch', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'ADVANCE_SEARCH'
    next()
}, canAccess, admissionTokenController.fetchTokensAdvanced)
router.post('/api/master/admissionToken/sample/save', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'SAVE'
    next()
}, canAccess, admissionTokenController.saveNewTokenSample)
router.post('/api/master/admissionToken/sample/delete', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'DELETE'
    next()
}, canAccess, admissionTokenController.deleteTokenSample)
router.post('/api/master/admissionToken/maskPattern/upsert', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'SAVE'
    next()
}, canAccess, admissionTokenController.upsertMaskPattern)
router.post('/api/master/admissionToken/maskPattern/delete', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'DELETE'
    next()
}, canAccess, admissionTokenController.deleteMaskPattern)
router.post('/api/master/admissionToken/entitlement/delete', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'DELETE'
    next()
}, canAccess, admissionTokenController.deleteEntitlement)
router.post('/api/master/admissionToken/codes/generate', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'SAVE'
    next()
}, canAccess, admissionTokenController.genrateTokenCodes)
router.post('/api/master/admissionToken/codes/fetch', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'GENERATE_COUPON',
        req.body.access_action = 'VIEW'
    next()
}, canAccess, admissionTokenController.fetchTokenCodes)
router.post('/api/master/admissionToken/codes/delete', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'DELETE'
    next()
}, canAccess, admissionTokenController.deleteGeneratedCode)
router.post('/api/master/admissionToken/maskPattern/lounge/update', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'EDIT'
    next()
}, canAccess, admissionTokenController.updateLoungeInMask)
router.post('/api/master/admissionToken/maskPattern/entitlement/update', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'EDIT'
    next()
}, canAccess, admissionTokenController.updateLoungeEntitlement)
router.post('/api/master/admissionToken/approve', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'APPROVE'
    next()
}, canAccess, admissionTokenController.approveToken)
// router.post('/api/master/admissionToken/approve', admissionTokenController.approveToken)
router.post('/api/master/admissionToken/validate/details', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'APPROVE'
    next()
}, canAccess, admissionTokenController.validateTokenDetails)
router.post('/api/master/admissionToken/reject', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'REJECT'
    next()
}, canAccess, admissionTokenController.rejectToken)
router.post('/api/master/admissionToken/clone', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'CLONE_TOKEN'
    next()
}, canAccess, admissionTokenController.cloneToken)
router.post('/api/master/admissionToken/entitlements/clone', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN'
    req.body.access_action = 'CLONE_TOKEN'
    next()
}, canAccess, admissionTokenController.cloneEntitlements)
router.post('/api/master/lounge/entitlements/clone', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN'
    req.body.access_action = 'CLONE_TOKEN'
    next()
}, canAccess, admissionTokenController.cloneEntitlementsFromOutlet)
router.post('/api/master/admissionToken/documents/update', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'SAVE'
    next()
}, canAccess, admissionTokenController.updateTokenDocuments)
router.post('/api/master/admissionToken/notes/update', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'SAVE'
    next()
}, canAccess, admissionTokenController.updateTokenNotes)
router.post('/api/master/admissionToken/submitForApproval', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'SUBMIT'
    next()
}, canAccess, admissionTokenController.submitForApproval)
router.post('/api/master/admissionToken/import/upsert', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'SAVE'
    next()
}, canAccess, admissionTokenController.upsertAIFromImport)
router.post('/api/master/admissionToken/fetchvaluebykeycode', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'GLOBAL_SETTING',
        req.body.access_action = 'SEARCH'
    next()
}, canAccess, admissionTokenController.fetchglobalvalueBykeycode)
router.post('/api/master/admissionToken/ExportPDF', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'GENERATE_AI'
    next()
}, canAccess, admissionTokenController.getDataforgeneratePDF)
router.post('/api/master/admissionToken/getDataforDelayedFlight', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'GENERATE_AI'
    next()
}, canAccess, admissionTokenController.getDataforDelayedFlight)

router.post('/api/master/admissionToken/ExportPDFNew', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'GENERATE_AI'
    next()
}, canAccess, admissionTokenController.getDataforgeneratePDFNew)


router.post('/api/master/admissionToken/getSendAILastDatetime', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'GENERATE_AI'
    next()
}, canAccess, admissionTokenController.getSendAILastDatetime)




router.post('/api/master/admissionToken/entilement/validate', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'SEARCH'
    next()
}, canAccess, admissionTokenController.validateEntitlements)



router.post('/api/master/admissionToken/sendAI', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'SEARCH'
    next()
}, canAccess, admissionTokenController.sendAIOnEmail)

router.post('/api/master/admissionToken/GeneratReceipts', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'PRINT'
    next()
}, canAccess, admissionTokenController.GetdataforGenerateReceipts)
router.post('/api/master/admissionToken/partner/entitlement/link/import', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'EDIT'
    next()
}, canAccess, admissionTokenController.importPartnerEntitlementLink)

router.post('/api/master/admissionToken/maskPattern/loungeEntitlement/fetch', (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'SEARCH'
    next()
}, tokenChecker.verifyToken, canAccess, admissionTokenController.fetchLoungeEntitlements)
router.post('/api/master/partner/walkin', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'SEARCH'
    next()
}, canAccess, admissionTokenController.fetchWalkinPartners)

router.post('/api/master/walkin/generateCode', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'SAVE'
    next()
}, canAccess, admissionTokenController.generateVoucherForWalkin)
router.post('/api/master/ebridge/generateCoupon', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'SAVE'
    next()
}, canAccess, admissionTokenController.createEBridgeCoupon)
router.post('/api/master/admissionToken/voucher/import/save', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN'
    req.body.access_action = 'IMPORT'
    next()
}, canAccess, admissionTokenController.importTokenVoucher)
router.post('/api/master/admissionToken/voucher/save', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN'
    req.body.access_action = 'SAVE'
    next()
}, canAccess, admissionTokenController.createVoucherBulk)
router.post('/api/master/admissionToken/import/voucher/log', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'IMPORT'
    next()
}, canAccess, admissionTokenController.importVoucherLog)


router.post('/api/master/admissionToken/import/createVoucherIB', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'IMPORT'
    next()
}, canAccess, admissionTokenController.createVoucherIB)
router.post('/api/master/admissionToken/change/status', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN'
    req.body.access_action = 'STATUS_CHANGE'
    next()
}, canAccess, admissionTokenController.toggleTokenStatus)
// createVoucherIB



router.post('/api/master/update/admission', admissionTokenController.updateAdmission)


router.post('/api/master/update/parnterLoungeLink', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'IMPORT'
    next()
}, canAccess, admissionTokenController.updatePartnerLoungeLink)

// router.post('/api/master/update/parnterLoungeLink', admissionTokenController.updatePartnerLoungeLink)



router.post('/api/master/es/index/token/create', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'TOKEN'
    req.body.access_action = 'CREATE'
    req.body.api = '/api/master/es/index/token/create'
    next()
}, canAccess, elasticsearchController.createTokenIndex)
router.post('/api/master/es/index/token/populate', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'TOKEN'
    req.body.access_action = 'SAVE'
    req.body.api = '/api/master/es/index/token/populate'
    next()
}, canAccess, elasticsearchController.populateTokensIndex)
router.post('/api/master/es/index/token/check/approved', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'TOKEN'
    req.body.access_action = 'SAVE'
    next()
}, canAccess, elasticsearchController.checkApprovedTokensInES)
router.post('/api/master/token/es/token/fetch/card', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'TOKEN'
    req.body.access_action = 'SEARCH'
    req.body.api = '/api/master/token/es/token/fetch/card'
    next()
}, canAccess, elasticsearchController.fetchTokenCard)
router.post('/api/master/token/filter/search', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'TOKEN'
    req.body.access_action = 'ADVANCE_SEARCH'
    req.body.api = '/api/master/token/filter/search'
    next()
}, canAccess, elasticsearchController.advanceSearchToken)
router.post('/api/master/token/bookings/search', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'TOKEN'
    req.body.access_action = 'ADVANCE_SEARCH'
    req.body.api = '/api/master/token/bookings/search'
    next()
}, canAccess, elasticsearchController.get48HoursBooking)
router.post('/api/master/token/es/token/whitelist', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'TOKEN'
    req.body.access_action = 'TYPE_CHANGE'
    req.body.api = '/api/master/token/es/token/whitelist'
    next()
}, canAccess, elasticsearchController.whitelistToken)
router.post('/api/master/token/es/token/blacklist', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'TOKEN'
    req.body.access_action = 'TYPE_CHANGE'
    req.body.api = '/api/master/token/es/token/blacklist'
    next()
}, canAccess, elasticsearchController.blacklistToken)

router.post(
    "/api/master/es/admissionToken/callGenerateQRCode",
    tokenChecker.verifyToken,
    (req, res, next) => {
        (req.body.access_module = "ADMISSION_TOKEN"),
            (req.body.access_action = "EDIT");
        next();
    },
    canAccess,
    elasticsearchController.callGenerateQRCode
);

router.post(
    "/api/master/es/admissionToken/sharedQRCode",
    tokenChecker.verifyToken,
    (req, res, next) => {
        (req.body.access_module = "ADMISSION_TOKEN"),
            (req.body.access_action = "EDIT");
        next();
    },
    canAccess,
    admissionTokenController.sharedQRCode
);

router.post(
    "/api/master/es/admissionToken/shareVoucherTemplate",
    tokenChecker.verifyToken,
    (req, res, next) => {
        (req.body.access_module = "ADMISSION_TOKEN"),
            (req.body.access_action = "EDIT");
        next();
    },
    canAccess,
    admissionTokenController.shareVoucherTemplate
);

//

router.post('/api/master/admissionToken/getAIText', 
// tokenChecker.verifyToken, (req, res, next) => {
//     req.body.access_module = 'ADMISSION_TOKEN',
//         req.body.access_action = 'GENERATE_AI'
//     next()
// }, canAccess, 
admissionTokenController.getAIText)

router.post('/api/master/admissionToken/getAITextById', 
// tokenChecker.verifyToken, (req, res, next) => {
//     req.body.access_module = 'ADMISSION_TOKEN',
//         req.body.access_action = 'GENERATE_AI'
//     next()
// }, canAccess, 
admissionTokenController.getAITextById)



router.post('/api/master/es/summaryReport', tokenChecker.verifyToken,
    (req, res, next) => {
        req.body.access_module = 'DAILY_ACTIVITY_SUMMARY_REPORT'
        req.body.access_action = 'RUN_REPORT'
        next()
    }, canAccess, elasticsearchController.summaryReport)

router.post(
    "/api/master/es/admissionToken/sharedQRCodePDF",
    tokenChecker.verifyToken,
    (req, res, next) => {
        (req.body.access_module = "ADMISSION_TOKEN"),
            (req.body.access_action = "EDIT");
        next();
    },
    canAccess,
    admissionTokenController.sharedQRCodePDF
);


// router.post(
//     "/api/master/es/admissionToken/sharedVoucherType",
//     tokenChecker.verifyToken,
//     (req, res, next) => {
//         (req.body.access_module = "ADMISSION_TOKEN"),
//             (req.body.access_action = "EDIT");
//         next();
//     },
//     canAccess,
//     admissionTokenController.sharedVoucherType
// );


router.post(
    "/api/master/es/admissionToken/createQrCodeForCoupons",
    tokenChecker.verifyToken,
    (req, res, next) => {
        (req.body.access_module = "ADMISSION_TOKEN"),
            (req.body.access_action = "EDIT");
        next();
    },
    canAccess,
    admissionTokenController.createQrCodeForCoupons
);
router.post(
    "/api/master/es/admissionToken/sharedCodeXLSX",
    tokenChecker.verifyToken,
    (req, res, next) => {
        (req.body.access_module = "ADMISSION_TOKEN"),
            (req.body.access_action = "EDIT");
        next();
    },
    canAccess,
    admissionTokenController.sharedQRCodeXLSX
);
router.post(
    "/api/master/es/admissionToken/cronCreateQRCode",
    admissionTokenController.cronCreateQRCode
);


router.post('/api/master/admissionToken/getAIText', 
// tokenChecker.verifyToken, (req, res, next) => {
//     req.body.access_module = 'ADMISSION_TOKEN',
//         req.body.access_action = 'GENERATE_AI'
//     next()
// }, canAccess, 
admissionTokenController.getAIText)
router.post(
    "/api/master/es/delete/records",
    tokenChecker.verifyToken,
    (req, res, next) => {
        req.body.access_module = "ELASTIC_SEARCH"
        req.body.access_action = "DELETE"
        next();
    },
    canAccess,
    elasticsearchController.deleteDataFromElastic
);
router.post(
    "/api/master/es/coupon/summary/report",
    tokenChecker.verifyToken,
    (req, res, next) => {
        req.body.access_module = "TOKEN"
        req.body.access_action = "SEARCH"
        next();
    },
    canAccess,
    elasticsearchController.apiCallSummaryCron
);
router.post(
    "/api/master/admissionToken/fetchPartnerEmail",
    tokenChecker.verifyToken,
    (req, res, next) => {
        (req.body.access_module = "ADMISSION_TOKEN"),
            (req.body.access_action = "EDIT");
        next();
    },
    canAccess,
    admissionTokenController.fetchPartnerEmail
);

router.post(
    "/api/master/admissionToken/fetchVoucherTemplate",
    tokenChecker.verifyToken,
    (req, res, next) => {
        (req.body.access_module = "ADMISSION_TOKEN"),
            (req.body.access_action = "EDIT");
        next();
    },
    canAccess,
    admissionTokenController.fetchVoucherTemplate
);
router.post(
    "/api/master/admissionToken/validateEntitlements",
    tokenChecker.verifyToken,
    (req, res, next) => {
        (req.body.access_module = "ADMISSION_TOKEN"),
            (req.body.access_action = "EDIT");
        next();
    },
    canAccess,
    admissionTokenController.validateEntitlement
);
router.post(
    "/api/master/admissionToken/fetchShareQRcodeLog",
    tokenChecker.verifyToken,
    (req, res, next) => {
        (req.body.access_module = "ADMISSION_TOKEN"),
            (req.body.access_action = "EDIT");
        next();
    },
    canAccess,
    admissionTokenController.fetchShareQRcodeLog
);

router.post(
    "/api/master/admissionToken/extend/coupon/date",
    tokenChecker.verifyToken,
    (req, res, next) => {
        (req.body.access_module = "ADMISSION_TOKEN"),
            (req.body.access_action = "EDIT");
        next();
    },
    canAccess,
    admissionTokenController.extendCouponDate
);

router.post(
    "/api/master/clientData/fixer/unlimitedQuota",
    clientDataFixerController.setTranssequno
);

router.post(
    "/api/master/clientData/fixer/sendResponse", tokenChecker.verifyToken, (req, res, next) => {
        req.body.access_module = 'PARTNER'
        req.body.access_action = 'EDIT'
        next()
    }, canAccess,
    clientDataFixerController.checkDPresponses
)

router.post(
    "/api/master/clientData/fixer/admissionEntitlementsWithinChange",
    clientDataFixerController.admissionEntitlementsWithinChange
)

//sharedQRCode
router.post('/api/master/token/es/token/blacklistTokenfromAPI', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'TOKEN'
    req.body.access_action = 'TYPE_CHANGE'
    next()
}, canAccess, elasticsearchController.blacklistTokenfromAPI)


router.post('/api/master/token/es/token/WhitlistTokenfromAPI', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'TOKEN'
    req.body.access_action = 'TYPE_CHANGE'
    req.body.api = '/api/master/token/es/token/WhitlistTokenfromAPI'
    next()
}, canAccess, elasticsearchController.WhitlistTokenfromAPI)
router.post('/api/master/token/export', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'TOKEN'
    req.body.access_action = 'EXPORT'
    next()
}, canAccess, elasticsearchController.exportToken)
router.post('/api/master/process/stage/token', async (req, res, next) => {
    try {
        const ingestion_user = await readGS.findOne({ lkCode: 'INGESTION_USER' }).select('key1').lean()
        if (ingestion_user) {
            const user = await readuser.findOne({ name: ingestion_user.key1 }).select('_id').lean()
            const config = {
                method: 'post',
                url: process.env.MASTER_SERVICE + 'api/master/user/authenticate',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({ _id: user._id })
            };
            const loginToken = await new Promise((resolve, reject) => {
                axios(config)
                    .then(function (response) {
                        return resolve(response.data);
                    })
                    .catch(function (error) {
                        console.log(error)
                        return reject(error);
                    });
            })
            if (loginToken.status === 1) {
                req.headers.authorization = ' ' + loginToken.result.token
                next()
            } else {
                const Response = new APIResponse()
                Response.setStatus(2)
                Response.setTag('/api/master/process/stage/token')
                Response.setDescription(loginToken.description)
                Response.setResult(null)
                return res.send(Response)
            }
        } else {
            const Response = new APIResponse()
            Response.setStatus(2)
            Response.setTag('/api/master/process/stage/token')
            Response.setDescription('Cannot found setting for ingestion user')
            Response.setResult(null)
            return res.send(Response)
        }

    } catch (err) {
        const Response = new APIResponse()
        Response.setStatus(2)
        Response.setTag('/api/master/process/stage/token')
        Response.setDescription(err.description)
        Response.setResult(null)
        return res.send(Response)
    }
}, tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'TOKEN'
    req.body.access_action = 'STAGE'
    next()
}, canAccess, elasticsearchController.processStagingData)

router.post('/api/master/contract/expiry', async (req, res, next) => {
    try {
        const ingestion_user = await readGS.findOne({ lkCode: 'INGESTION_USER' }).select('key1').lean()
        if (ingestion_user) {
            const user = await readuser.findOne({ name: ingestion_user.key1 }).select('_id').lean()
            const config = {
                method: 'post',
                url: process.env.MASTER_SERVICE + 'api/master/user/authenticate',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({ _id: user._id })
            };
            const loginToken = await new Promise((resolve, reject) => {
                axios(config)
                    .then(function (response) {
                        return resolve(response.data);
                    })
                    .catch(function (error) {
                        console.log(error)
                        return reject(error);
                    });
            })
            if (loginToken.status === 1) {
                req.headers.authorization = ' ' + loginToken.result.token
                next()
            } else {
                const Response = new APIResponse()
                Response.setStatus(2)
                Response.setTag('/api/master/process/stage/token')
                Response.setDescription(loginToken.description)
                Response.setResult(null)
                return res.send(Response)
            }
        } else {
            const Response = new APIResponse()
            Response.setStatus(2)
            Response.setTag('/api/master/contract/expiry')
            Response.setDescription('Cannot found setting to authenticate user')
            Response.setResult(null)
            return res.send(Response)
        }

    } catch (err) {
        const Response = new APIResponse()
        Response.setStatus(2)
        Response.setTag('/api/master/process/stage/token')
        Response.setDescription(err.description)
        Response.setResult(null)
        return res.send(Response)
    }
}, tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'TOKEN'
    req.body.access_action = 'STAGE'
    next()
}, canAccess, partnerContractController.checkContractExpiry)

router.post('/test/redis', async (req, res, next) => {
    const Partner = require('../models/mongoSchemas/partner')
    const partners = await Partner.find().cache({ key: '3123' }).lean()
    res.send(partners)
})
router.post('/api/master/generateCoupons/search/simple', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'GENERATE_COUPON'
    req.body.access_action = 'SEARCH'
    next()
}, canAccess, admissionTokenController.fetchCouponSimple)
router.post('/api/master/generateCoupons/search/advance', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'GENERATE_COUPON'
    req.body.access_action = 'ADVANCE_SEARCH'
    next()
}, canAccess, admissionTokenController.fetchCouponAdvance)
router.post('/api/master/generatedCoupons/fetch/by/id', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'GENERATE_COUPON'
    req.body.access_action = 'EDIT'
    next()
}, canAccess, admissionTokenController.fetchCouponCodesById)
// router.post('/api/master/partner/coupons/migration', async (req, res, next) => {
//     try {
//         const ingestion_user = await readGS.findOne({ lkCode: 'INGESTION_USER' }).select('key1').lean()
//         if (ingestion_user) {
//             const user = await readuser.findOne({ remoteUserID: ingestion_user.key1 }).select('_id').lean()
//             const config = {
//                 method: 'post',
//                 url: process.env.MASTER_SERVICE + 'api/master/user/authenticate',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 data: JSON.stringify({ _id: user._id })
//             };
//             const loginToken = await new Promise((resolve, reject) => {
//                 axios(config)
//                     .then(function (response) {
//                         return resolve(response.data);
//                     })
//                     .catch(function (error) {
//                         console.log(error)
//                         return reject(error);
//                     });
//             })
//             if (loginToken.status === 1) {
//                 req.headers.authorization = ' ' + loginToken.result.token
//                 next()
//             } else {
//                 const Response = new APIResponse()
//                 Response.setStatus(2)
//                 Response.setTag('/api/master/process/stage/token')
//                 Response.setDescription(loginToken.description)
//                 Response.setResult(null)
//                 return res.send(Response)
//             }
//         } else {
//             const Response = new APIResponse()
//             Response.setStatus(2)
//             Response.setTag('/api/master/contract/expiry')
//             Response.setDescription('Cannot found setting to authenticate user')
//             Response.setResult(null)
//             return res.send(Response)
//         }

//     } catch (err) {
//         const Response = new APIResponse()
//         Response.setStatus(2)
//         Response.setTag('/api/master/process/stage/token')
//         Response.setDescription(err.description)
//         Response.setResult(null)
//         return res.send(Response)
//     }
// }, tokenChecker.verifyToken, (req, res, next) => {
//     req.body.access_module = 'TOKEN'
//     req.body.access_action = 'STAGE'
//     next()
// }, canAccess, partnerController.migratePartnerCoupons)
router.post('/api/master/partner/coupons/migration', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'TOKEN'
    req.body.access_action = 'STAGE'
    next()
}, canAccess, partnerController.migratePartnerCoupons)
router.post('/api/kms/datakey', kmsController.generateHMACKey)
router.post('/api/master/kms/mac/generate', tokenChecker.verifyToken, kmsController.generateHMACKeyForPartners)
router.post('/api/master/kms/datakey/generate', tokenChecker.verifyToken, kmsController.setDataKeyPairForOutlets)
router.post('/api/master/kms/datakey/check', async (req, res, next) => {
    try {
        res.send(await kmsController.generateDataKeyPair('123'))
    }
    catch (err) {
        res.send(err.message)
    }
})
router.post('/api/master/kms/hmackey/check', async (req, res, next) => {
    try {
        res.send(await kmsController.generateHMACKey())
    }
    catch (err) {
        res.send(err.message)
    }
})

// router.use('/api/master/redis/flushdb', (req, res, next) => {
//     CacheService.flushdb()
//     res.send('OK')
// })

router.get('/api/master/template/download/:name', (req, res, next) => {
    const path = require('path')
    const filePath = path.join(__dirname, '..', 'excelTemplates', req.params.name);

    // Set appropriate headers for a downloadable text file
    res.setHeader('Content-disposition', 'attachment; filename=' + req.params.name);
    res.setHeader('Content-type', 'text/plain');

    // Send the file as a download
    res.download(filePath, req.params.name, (err) => {
        if (err) {
            // Handle error, if any
            next(err);
        }
    });
})

router.post('/api/master/s3/imageURL', tokenChecker.verifyToken, commonController.getSignedImage)

router.post('/api/master/report/queue', async (req, res, next) => {
    try {
        const auth = await commonController.generateSystemAuthToken()
        if (!auth.error) {
            req.body.authorisedUser = auth.token
            next()
        } else {
            res.send('error occured')
        }
    } catch (err) {
        console.log(err)
    }
}, reportQueueController.schedularReportQueue)

router.post('/api/master/v1/coupon/generate', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'SAVE'
    next()
}, canAccess, thirdPartyCouponController.generateNewCoupon)
router.post('/api/master/v1/coupon/info', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'SAVE'
    next()
}, canAccess, thirdPartyCouponController.getCouponInfo)
router.post('/api/master/v1/coupon/cancel', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'SAVE'
    next()
}, canAccess, thirdPartyCouponController.cancelCoupon)
router.post('/api/master/token/accessHistoryAdmission', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'SAVE'
    next()
}, canAccess, elasticsearchController.accessHistoryAdmission)









router.post('/api/master/partner/card/map/member/id', partnerCardController.createMemeberForPartnerCard)
router.post('/api/master/partner/card/migration', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN'
    req.body.access_action = 'SAVE'
    next()
}, canAccess, partnerCardController.migratePartnerCard)
router.post('/api/master/partner/card/get', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN'
    req.body.access_action = 'SAVE'
    next()
}, canAccess, partnerCardController.getPartnerForCardMember)
router.post('/api/master/submit/loungeMemberRegistrationDetails', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN'
    req.body.access_action = 'SAVE'
    next()
}, canAccess, LoungeMembershipRegistrations.createLoungeMembershipRegistrations)
router.post('/api/master/loungeMember/voucher/save', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN'
    req.body.access_action = 'SAVE'
    next()
}, canAccess, LoungeMembershipRegistrations.createVoucher)
router.post('/api/master/loungeMember/reject', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN'
    req.body.access_action = 'SAVE'
    next()
}, canAccess, LoungeMembershipRegistrations.rejectRegisteredUser)

router.post('/api/master/loungeMember/actionHistory', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN'
    req.body.access_action = 'SAVE'
    next()
}, canAccess, LoungeMembershipRegistrations.actionHistory)
router.post('/api/master/member/createMemberID', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN'
    req.body.access_action = 'SAVE'
    next()
}, canAccess, LoungeMembershipRegistrations.createMemberID)
router.post('/api/master/fetch/corporateTypeAi', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN'
    req.body.access_action = 'SAVE'
    next()
}, canAccess, LoungeMembershipRegistrations.corporateTypeAI)

router.post('/api/master/member/getCurrency', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN'
    req.body.access_action = 'SAVE'
    next()
}, canAccess, LoungeMembershipRegistrations.getCurrencyName)
router.post('/api/master/fetch/RegisterdMember', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN'
    req.body.access_action = 'SAVE'
    next()
}, canAccess, LoungeMembershipRegistrations.fetchRegisteredMembers)

router.post('/api/master/fetch/simpleSearch/RegisterdMember', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN'
    req.body.access_action = 'SAVE'
    next()
}, canAccess, LoungeMembershipRegistrations.fetchsimpleSearchRegisteredMembers)
router.post('/api/master/fetch/advanceSearch/RegisterdMember', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN'
    req.body.access_action = 'SAVE'
    next()
}, canAccess, LoungeMembershipRegistrations.fetchAdvanceSearchRegisteredMembers)
router.post('/api/master/fetch/RegisterdMemberDetails', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN'
    req.body.access_action = 'SAVE'
    next()
}, canAccess, LoungeMembershipRegistrations.fetchRegisteredMembersDetails)
router.post('/api/master/admissionToken/actionHistory/fetch', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'VIEW'
    next()
}, canAccess, admissionTokenController.fetchActionHistory)
router.post('/api/master/fetch/memberBookingMemberID', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'VIEW'
    next()
}, canAccess, LoungeMembershipRegistrations.fetchmemberBookingMemberID)
router.post('/api/master/fetch/loungeMemberRegistrationTokenDetails', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'VIEW'
    next()
}, canAccess, LoungeMembershipRegistrations.loungeMemberRegistrationTokenDetails)
router.post('/api/master/validate/memberShipID', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'VIEW'
    next()
}, canAccess, LoungeMembershipRegistrations.validateMembershipID)

router.post('/api/master/submit/loungeMemberBookingDetails', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'VIEW'
    next()
}, canAccess, LoungeMembershipRegistrations.submitloungeMemberBookingDetails)
router.post('/api/master/fetch/loungeMemberBooking', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'VIEW'
    next()
}, canAccess, LoungeMembershipRegistrations.fetchLoungeMemberBooking)
router.post('/api/master/fetch/loungeMemberBookingDetailsbyID', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'VIEW'
    next()
}, canAccess, LoungeMembershipRegistrations.fetchLoungeMemberBookingDetails)

router.post('/api/master/cancel/loungememberBooking', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'VIEW'
    next()
}, canAccess, LoungeMembershipRegistrations.cancelMemberBooking)
router.post('/api/master/action/fetchStatusHistory', tokenChecker.verifyToken, (req, res, next) => {
    req.body.access_module = 'ADMISSION_TOKEN',
        req.body.access_action = 'VIEW'
    next()
}, canAccess, LoungeMembershipRegistrations.fetchstatusHistory)
// router.post('/api/master/s3/download', AWSBucketController.downloadFilesFromBucket)
// router.post('/api/master/s3/upload/local', AWSBucketController.uploadFileFromLocal)
router.post('/api/master/encryptCard', authenticateController.encryptNumber)


router.post('/api/master/getBookingPDF', elasticsearchController.getBookingPDF)
router.post('/api/master/elasticsearchBackup', elasticsearchController.getElasticsearchBackup)


module.exports = router

async function clearCache(req, res, next) {
    await next()
    CacheService.deleteHash('3123')
}

async function decryptBody(req, res, next) {
    try {
        if (req.body.encrypted) {
            req.body = JSON.parse(await kmsController.decodeRequestBody(req.body.encrypted))
        }
        next()
    }
    catch (err) {
        const Response = new APIResponse()
        Response.setStatus(2)
        Response.setToken('')
        Response.setTag('')
        Response.setInput(req.body)
        Response.setDescription('Could not decrypt request body')
        Response.setResult(null)
        return res.send(Response)
    }

}

router.post('/api/master/encrypt/swagger', (req, res,) => {
    const JSEncrypt = require('nodejs-jsencrypt').default;
    let encryptedToken = '4147099984629970';
    let maskedNum = '';
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey("MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA2qlJM2jMR5CciIjE2F3G4lCjAWvpsWgi0QTjy7lrLGIhsREHlLAhPBzu6M4505zwe3yjok7ANoGiirGxpguFYh8758lZGLDotKDoIsPHi6T/ZnuBJSncHbHp90WCqvghjNmyYMvFU5rOW9MhZ5pM4ztxuxEaThwGIalX4lL82B3twutDvM4PIw8Go5NC0Bu9tto6cA7QB8p2XYI0wo84H7e+mucJge/L/nAhvdXZGpvD5mM4NIRx1tHpN/aOkXzetJTE2MXG256vdtM7ZHKBju0DzOaHpltqYHO+mWMhw+QYON48w3Ko3z1Q01v5fqh/XiK+HtitrIXvIoetUmRfTnnjK4459sqZLbJoX+rzgVKaQuEIIczxxgMb7Vy0rwKBf+oy9Gco+Jm+cSXYU2ii6OfErV4hFANVPnbbmBosCsuLk5WyLvMEos0B8tao0lIyG5C0gfhvJ0WuYZYNj7qi0wKC32Z22kYR1rqW3xytW/RPqWe+IapsozfTB7dUuKP1LH30+MuAMytCgay82/gQXjhU3zlmfhM0LwDssIyvphcD6gKARAObsknDt1hvJF1wvb5LT9qPIdPygD7uPqcqs9O2KdPtXKRLhur/ELkkEaIjIlEvLU93OtxD7N5BMt7l4RCJHRASv8EwJtm0FJzdAHeS0UvF6d7lGGE0LfhAEmcCAwEAAQ==");
    encryptedToken = encrypt.encrypt(encryptedToken).toString();
    var match = '4147099984629970'.match(/^(.{6})(.+)(.{4})$/);
    maskedNum = match[1] + match[2].replace(/./g, _ => '*') + match[3];
    return res.send({
        maskedNum,
        hax: encryptedToken,
        certificateId: "3a01a25ee0876d456de105cfaffa2a7d"
    })
})



router.post('/api/master/user/deleteRedisKey', authenticateController.deleteKeyFromRedis)


router.post("/api/master/admissionToken/fetch/aiNotes",tokenChecker.verifyToken, admissionTokenController.fetchAINotesContent)
router.post("/api/master/admissionToken/update/aiNotes/status",tokenChecker.verifyToken, admissionTokenController.updateStatusAiNotes)
