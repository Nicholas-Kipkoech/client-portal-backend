import pool from "../../config/oracledb-connect.js";
import { config } from "dotenv";
import { getJournaleReportConfig } from "../../config/report-config.js";
config();
class ClaimCreditNotesController {
  async getClaimCreditNotes(req, res) {
    let connection;
    let results;
    try {
      const { intermediaryCode, clientCode } = req.body;
      console.log(req.body);
      connection = (await pool).getConnection();
      console.log("Database is connected");
      if (
        intermediaryCode === "15" ||
        intermediaryCode === "70" ||
        intermediaryCode === "25"
      ) {
        results = (await connection).execute(
          `select hd_org_code,    
         hd_no,    
         hd_index,    
         hd_trn_code,    
         hd_batch_no,    
         hd_narration,    
         hd_gl_date,    
         hd_cur_code,    
         hd_cur_rate,    
         hd_lc_dr_amount,    
         hd_lc_cr_amount,    
         hd_fc_dr_amount,    
         hd_fc_cr_amount,    
         hd_type,    
         hd_complete,    
         hd_status,    
         DECODE (hd_posted, 'Y', 'Yes', 'No') hd_posted,    
         a.created_by,    
         pkg_system_admin.get_user_name (a.created_by) created_by_xx,    
         pkg_system_admin.timeago (a.created_on) created_age,    
         hd_os_code,    
         pkg_sa.org_structure_name (hd_org_code, hd_os_code) hd_os_code_xx,    
         hd_canc_reason,    
         hd_canc_remarks,    
         hd_canc_date,
          pkg_system_admin.get_entity_name(b.LN_LINK_AENT_CODE,b.LN_LINK_ENT_CODE)insured, 
         pkg_system_admin.get_system_desc ('RGBA_StatusValues', hd_status) status_bg_color_xx  
           from gl_je_header a, gl_je_lines b    
          where hd_org_code = :org_code
          and b.LN_AENT_CODE=nvl(:intermediaryCode,b.LN_AENT_CODE)
          and b.LN_ENT_CODE = nvl(:clientCode,b.LN_ENT_CODE)
          and hd_type='CREDIT NOTE'
          and hd_no = b.LN_HD_NO and hd_posted = 'Y' order by hd_gl_date desc`,
          { intermediaryCode, clientCode, org_code: "50" }
        );
      } else {
        results = (await connection).execute(
          `select hd_org_code,    
         hd_no,    
         hd_index,    
         hd_trn_code,    
         hd_batch_no,    
         hd_narration,    
         hd_gl_date,    
         hd_cur_code,    
         hd_cur_rate,    
         hd_lc_dr_amount,    
         hd_lc_cr_amount,    
         hd_fc_dr_amount,    
         hd_fc_cr_amount,    
         hd_type,    
         hd_complete,    
         hd_status,    
         DECODE (hd_posted, 'Y', 'Yes', 'No') hd_posted,    
         a.created_by,    
         pkg_system_admin.get_user_name (a.created_by) created_by_xx,    
         pkg_system_admin.timeago (a.created_on) created_age,    
         hd_os_code,    
         pkg_sa.org_structure_name (hd_org_code, hd_os_code) hd_os_code_xx,    
         hd_canc_reason,    
         hd_canc_remarks,    
         hd_canc_date,
          pkg_system_admin.get_entity_name(b.LN_AENT_CODE,b.LN_ENT_CODE)insured, 
         pkg_system_admin.get_system_desc ('RGBA_StatusValues', hd_status) status_bg_color_xx  
         from gl_je_header a, gl_je_lines b    
         where hd_org_code = :org_code
         and b.LN_LINK_AENT_CODE=nvl(:intermediaryCode,b.LN_LINK_AENT_CODE)
         and b.LN_LINK_ENT_CODE = nvl(:clientCode,b.LN_LINK_ENT_CODE)
         and hd_type='CREDIT NOTE'
         and hd_no = b.LN_HD_NO and hd_posted ='Y' order by hd_gl_date desc`,
          { intermediaryCode, clientCode, org_code: "50" }
        );
      }

      if ((await results).rows && (await results).rows.length > 0) {
        const formattedData = (await results).rows?.map((row) => ({
          receiptIndex: row[2],
          journalNo: row[1],
          glDate: row[6],
          status: row[15],
          currency: row[7],
          DRTotal: row[9],
          CRTotal: row[10],
          type: row[13],
          posted: row[16],
          narration: row[5],
          insured: row[25],
          receiptUrl: getJournaleReportConfig(row[1], row[2]),
        }));
        res.json({
          success: true,
          results: formattedData,
        });
      } else {
        return res.status(200).json({ success: false, results: [] });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    } finally {
      try {
        if (connection) {
          (await connection).close();
          console.info("Connection closed successfully");
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}

const claimCreditNotesController = new ClaimCreditNotesController();
export default claimCreditNotesController;
